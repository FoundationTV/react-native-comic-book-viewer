package com.comicreader;

import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class ImmersiveModule extends ReactContextBaseJavaModule {

    public ImmersiveModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ImmersiveModule";
    }

    @ReactMethod
    public void setFullscreen(boolean isFullscreen) {
        runOnUiThread(() -> {
            Log.i(getName(), "isFullscreen: " + isFullscreen);
            int flags = 0;
            if (isFullscreen)
                flags = View.SYSTEM_UI_FLAG_IMMERSIVE
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN;
            else
                flags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
            View decorView = getCurrentActivity().getWindow().getDecorView();
            Log.i(getName(), "decorView: " + decorView);
            Log.i(getName(), "flags: " + flags);
            decorView.setSystemUiVisibility(flags);
        });
    }
}
