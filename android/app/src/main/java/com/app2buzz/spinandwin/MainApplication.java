package com.app2buzz.spinandwin;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.RNSvgPackage;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.bitgo.randombytes.RandomBytesPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import org.pgsqlite.SQLitePluginPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    // If you want to use AppEventsLogger to log events.
    //AppEventsLogger.activateApp(this);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
         new RNDeviceInfo(),
         new RNUUIDGeneratorPackage(),
         new MainReactPackage(),
            new RNSvgPackage(),
         new UdpSocketsModule(),
         new TcpSocketsModule(),
         new RandomBytesPackage(),
         new BarcodeScannerPackage(),
         new RNSpinkitPackage(),
         new RNSoundPackage(),
         new RNFetchBlobPackage(),
         new SQLitePluginPackage(),
         new LinearGradientPackage(),
         new FBSDKPackage(mCallbackManager)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
