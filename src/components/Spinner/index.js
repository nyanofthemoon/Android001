import React, { Component } from 'react'
import { StyleSheet, View, Text, Animated, PanResponder, Easing } from 'react-native'

export default function makeSpinnable(TargetComponent) {

  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        rotate: new Animated.Value(0),
        isPanning: false,
        isRotating: false
      }
      this.rot = 0
      this._onLayout = this._onLayout.bind(this)
      this.getStyle = this.getStyle.bind(this)
    }

    componentWillMount() {
      this.state.rotate.addListener(value => {
        this.rot = value.value
        typeof this.props.onRotationChange === 'function' && this.props.onRotationChange(value.value)
      })

      this._panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => this.props.disabled ? false : this.props.preventTouchStop ? !this.state.isRotating : true,
        onPanResponderGrant: (e, gestureState) => {
          this.state.rotate.stopAnimation()
          const initialVector = [gestureState.x0 - this.centerX, gestureState.y0 - this.centerY]
          this.initialAngle = Math.atan2(...initialVector)
          this.initialRot = this.rot
        },
        onPanResponderMove: (e, gestureState) => {
          if (!this.state.isPanning) {
            this.setState({
              isPanning: true
            })
          }
          const currentVector = [gestureState.moveX - this.centerX, gestureState.moveY - this.centerY]
          const newAngle = Math.atan2(...currentVector)
          let angleDiff = (newAngle - this.initialAngle) * 360 / (Math.PI * 2)
          if (angleDiff < 0) {
            angleDiff = angleDiff + 360
          }
          this.state.rotate.setValue(this.initialRot - angleDiff)

        },
        onPanResponderRelease: (e, gestureState) => {

          const velocity = [gestureState.vx, gestureState.vy]
          const velocityMag = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1])

          const currentVector = [gestureState.moveX - this.centerX, gestureState.moveY - this.centerY]
          const currentVectorMag = Math.sqrt(currentVector[0] * currentVector[0] + currentVector[1] * currentVector[1])
          const currentVectorNorm = [currentVector[0] / currentVectorMag, currentVector[1] / currentVectorMag]

          const vxComponent = velocity[0] * currentVectorNorm[0] + velocity[1] * currentVectorNorm[1]
          const vyComponent = Math.sqrt(velocityMag * velocityMag - vxComponent * vxComponent)

          const crossProduct = velocity[0] * currentVectorNorm[1] - velocity[1] * currentVectorNorm[0]

          const sign = crossProduct > 0 ? -1 : 1

          this.setState({isPanning: false})

          if ((Math.abs(vyComponent) > (this.props.spinThreshold || 0))) {
            const vyComp = vyComponent
            this.setState({isRotating: true})
            typeof this.props.onRotationStart === 'function' && this.props.onRotationStart(sign === 1 ? 'forward' : 'backwards')

            const cb = ({value}) => {
              this.state.rotate.flattenOffset()
              this.setState({
                isRotating: false
              })
              typeof this.props.onRotationStop === 'function' && this.props.onRotationStop(value)
            }

            if (this.props.angleProbs) {

              const angleProbs = this.props.angleProbs.reduce((acc, ap) => {
                return [
                  ...acc,
                  acc.length === 0 ? ap : {angle: ap.angle, prob: ap.prob + acc[acc.length - 1].prob}
                ]
              }, [])

              const rand = Math.random()
              const randAp = angleProbs.find(ap => ap.prob >= rand)

              Animated.timing(this.state.rotate, {
                duration: (2.5*this.props.spinDuration) * 1000,
                toValue: (
                  sign > 0 ?
                  Math.ceil(this.rot / 360) * 360  + (360 * this.props.spinDuration) + randAp.angle :
                  Math.floor(this.rot / 360) * 360 - (360 * this.props.spinDuration) + randAp.angle
                ),
                easing: Easing.out(Easing.ease)
              }).start(cb)
            }
            else {
              Animated.decay(this.state.rotate, {
                velocity: sign * vyComp,
                deceleration: 0.997
              }).start()
            }
          }
          else {
            this.state.rotate.flattenOffset()
          }
        }
      })
    }

    componentWillUnmount() {
      this.state.rotate.removeAllListeners()
    }

    getStyle() {
      return {
        transform: [
          {
            rotateZ: (
              Animated.modulo(
                this.state.rotate, 360
              ).interpolate({
                inputRange: [0, 359],
                outputRange: ['0deg', '359deg']
              })
            )
          }
        ]
      }
    }

    _onLayout({nativeEvent: {layout}}) {
      this.centerX = layout.x + layout.width / 2
      this.centerY = layout.y + layout.height / 2
    }

    render() {
      return (
        <View onLayout={this._onLayout}>
          <Animated.View
            style={[this.getStyle()]}
            {...this._panResponder.panHandlers}
          >
            <TargetComponent {...this.props} />
          </Animated.View>
        </View>
      )
    }
  }
}