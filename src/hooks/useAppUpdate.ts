import * as Application from 'expo-application' ;
import * as Device from 'expo-device' ;
import * as Sentry from 'sentry-expo' ;
import SpInAppUpdates, {
  IAUInstallStatus,
  IAUUpdateKind,
  StartUpdateOptions,
  StatusUpdateEvent,
} from 'sp-react-native-in-app-updates' ;
import { Platform } from 'react-native' ;
import checkVersion from 'react-native-store-version' ;
import diff from 'semver/functions/diff' ;
import { useEffect } from 'react' ;
import { useTranslation } from 'react-i18next' ;

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=' ;

let inAppUpdates: SpInAppUpdates ;
const useAppUpdate = () => {

  const { t } = useTranslation() ;

  const onUpdateState = (event: StatusUpdateEvent) => {
    if( event.status === IAUInstallStatus.DOWNLOADED && inAppUpdates ) {
      // Launch installation update
      inAppUpdates.installUpdate() ;
    } else if( event.status === IAUInstallStatus.INSTALLED && inAppUpdates ) {
      inAppUpdates.removeStatusUpdateListener(onUpdateState) ;
    }
  } ;

  useEffect(() => {
    const appUpdate = async () => {
      try {
        if(Device.isDevice && Application.nativeApplicationVersion && Application.applicationId) {
          inAppUpdates = new SpInAppUpdates(true) ;

          let needUpdate = true ;
          let force = false ;

          if( Platform.OS === 'android' ) {
            // Check Google Play Store
            const check = await checkVersion({
              androidStoreURL: PLAY_STORE_URL + Application.applicationId,
              version: Application.nativeApplicationVersion,
            }) ;

            // check version diff
            const result = diff(check.local, check.remote) ;

            if(result === 'major') {
              needUpdate = true ;
              force = true ;
            } else if(result === 'minor') {
              needUpdate = true ;
            }
          } else {
            // check Apple App Store
            const check = await inAppUpdates.checkNeedsUpdate() ;
            needUpdate = check.shouldUpdate ;
          }

          if(needUpdate) {

            let updateOptions: StartUpdateOptions ;

            if( Platform.OS === 'android' ) {
              if(!force) {
                inAppUpdates.addStatusUpdateListener(onUpdateState) ;
              }
              updateOptions = {
                updateType: force ? IAUUpdateKind.IMMEDIATE : IAUUpdateKind.FLEXIBLE,
              } ;
            } else {
              updateOptions = {
                buttonCancelText: t('actions.cancel'),
                buttonUpgradeText: t('actions.upgrade'),
                //country: 'en', // 👈🏻 the country code for the specific version to lookup for (optional)
                forceUpgrade: force,
                message: t('settings.update.message'),
                title: t('settings.update.title'),
              } ;
            }

            // launch UI
            await inAppUpdates.startUpdate(updateOptions) ;
          }
        }

      } catch (e) {
        Sentry.Native.captureException(e) ;
      }
    } ;

    void appUpdate() ;

    return () => {
      if( Platform.OS === 'android' && inAppUpdates ) {
        inAppUpdates.removeStatusUpdateListener(onUpdateState) ;
      }
    } ;
  }, []) ;
} ;

export default useAppUpdate ;
