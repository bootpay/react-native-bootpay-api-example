#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React-RCTAppDelegate/RCTReactNativeFactory.h>
#import <React-RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>

@interface BootpayReactNativeDelegate : RCTDefaultReactNativeFactoryDelegate
@end

@implementation BootpayReactNativeDelegate

- (NSURL *)sourceURLForBridge:(id)bridge
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

@interface AppDelegate ()
@property (nonatomic, strong) RCTReactNativeFactory *factory;
@property (nonatomic, strong) BootpayReactNativeDelegate *reactDelegate;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.reactDelegate = [BootpayReactNativeDelegate new];
  self.reactDelegate.dependencyProvider = [RCTAppDependencyProvider new];

  self.factory = [[RCTReactNativeFactory alloc] initWithDelegate:self.reactDelegate];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];

  [self.factory startReactNativeWithModuleName:@"ReactNativeExample"
                                      inWindow:self.window
                                 launchOptions:launchOptions];

  return YES;
}

@end
