
#import "AppDelegate.h"
 
#import <React/RCTBundleURLProvider.h>
 
#import <UIKit/UIKit.h>
 
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{


  // You can add your custom initial props in the dictionary below.

  // They will be passed down to the ViewController used by React Native.

  self.moduleName = @"ReactNativeExample";
  
  
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];


  return YES; // 수정

}

- (BOOL)application:(UIApplication *)app

     openURL:(NSURL *)url

     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  
  return NO;

}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge

{

  return [self bundleURL];

}

- (NSURL *)bundleURL

{

#if DEBUG

  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];

#else

  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

#endif

}

@end
