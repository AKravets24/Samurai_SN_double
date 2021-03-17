import { createSelector } from 'reselect'
import { AppStateType } from './redux-store';


// APP RESELECTORS====================================================================================================================APP RESELECTORS============

export const getBackGroundReducer = (state: AppStateType) => state.backgroundReducer;
export const getInitialized = (state: AppStateType) => state.appAuthReducer.appIsInitialized;
export const getAppACs = (state: AppStateType) => state.appAC;
export const getBackGroundSetterACs = (state: AppStateType) => state.backGroundSetterACs;

const getBackgroundPic = (state: AppStateType) => state.backgroundReducer.backgroundPic;
const getTimeToChangeTheme = (state: AppStateType) => state.backgroundReducer.timeToChangeTheme;
const getAuth_LDR_GIF = (state: AppStateType) => state.backgroundReducer.auth_LDR_GIF; //also used in Profile reSelector


export type GetSmartBGR_type = { backgroundPic: string, timeToChangeTheme: number, auth_LDR_GIF: string }
export const getSmartBackGroundReducer = createSelector(getBackgroundPic, getTimeToChangeTheme, getAuth_LDR_GIF,
    (backgroundPic, timeToChangeTheme, auth_LDR_GIF): GetSmartBGR_type => {
        return { backgroundPic, timeToChangeTheme, auth_LDR_GIF }
    });

export const geSmartInitialized = createSelector(getInitialized, (appInitialized) => {
    return { appInitialized }
});

// HEADER RESELECTORS================================================================================================================HEADER RESELECTORS=============
export const getColorTheme = (state: AppStateType) => state.backgroundReducer.theme; //also used in Dialogs reSelector
export const getHeaderAC = (state: AppStateType) => state.headerAC; //also used in Users   reSelector
// in reSelector control, it returns appReducer's state
const getAppIsInitialized = (state: AppStateType) => state.appAuthReducer.appIsInitialized;
export const getMyId = (state: AppStateType) => state.appAuthReducer.id; //also used in Profile, NavBar reSelectors, ContentComp
const getEmail = (state: AppStateType) => state.appAuthReducer.email;
const geLogin = (state: AppStateType) => state.appAuthReducer.login;
export const getIsAuth = (state: AppStateType) => state.appAuthReducer.isAuth; //also used in ContentComp
const getAuthErr = (state: AppStateType) => state.appAuthReducer.authErr;
const getCaptchaPic = (state: AppStateType) => state.appAuthReducer.captchaPic;
const getErrCaptchaGet = (state: AppStateType) => state.appAuthReducer.errCaptchaGet;
export const getSmartAppAuthReducer = createSelector(getAppIsInitialized, getMyId, getEmail, geLogin, getIsAuth, getAuthErr,
    getCaptchaPic, getErrCaptchaGet,
    (appIsInitialized, id, email, login, isAuth, authErr, captchaPic, errCaptchaGet) => { return { appIsInitialized, id, email, login, isAuth, authErr, captchaPic, errCaptchaGet } });

// NAVBAR RESELECTORS=================================================================================================================NAVBAR RESELECTORS============

export const getDialogACs = (state: AppStateType) => state.dialogACs;
export const getTheme = (state: AppStateType) => state.backgroundReducer.theme; //also used in Profile reSelector
const getBtnNewMessagesState = (state: AppStateType) => state.dialogsReducer.newMessageBTNDisabled;
const getNewMSGSCounter = (state: AppStateType) => state.dialogsReducer.newMessagesCounter;
const getMsgLoader = (state: AppStateType) => state.dialogsReducer.msgLoader; //also used in Dialogs reSelector
const getErrGettingNewMSGSCount = (state: AppStateType) => state.dialogsReducer.errGettingNewMSGSCount; //also used in Dialogs reSelector
const getOnErrorPic = (state: AppStateType) => state.dialogsReducer.onError;

export const getSmartPartialDialogReducer = createSelector(getBtnNewMessagesState, getNewMSGSCounter, getMsgLoader, getErrGettingNewMSGSCount, getOnErrorPic,
    (newMessageBTNDisabled, newMessagesCounter, msgLoader, errGettingNewMSGSCount, onError) => {
        return { newMessageBTNDisabled, newMessagesCounter, msgLoader, errGettingNewMSGSCount, onError }
    })

// CONTENTCOMP RESELECTORS===========================================================================================================CONTENTCOMP RESELECTORS========
export const getSmartIdAndIsAuth = createSelector(getIsAuth, getMyId, (isAuth, id) => { return { isAuth, id } })

// PROFILE RESELECTORS===============================================================================================================PROFILE RESELECTORS============
// export const getMyId                       = state => state.appAuthReducer.id                                ;
export const getProfileACs = (state: AppStateType) => state.profileACs;
export const getProfilePics = (state: AppStateType) => state.profilePics;
// in reSelector's control it returns  profileReducer's state
// ProfileReducerPart_1
const getWallPosts = (state: AppStateType) => state.profileReducer.wallPosts;
const getWallPostsLength = (state: AppStateType) => state.profileReducer.wallPosts.length; // контролит ДЛИНУ массива
const getProfileData = (state: AppStateType) => state.profileReducer.profileData;
const getProfileDataPhotoLarge = (state: AppStateType) => state.profileReducer.profileData.photos.large;
const getProfileDataPhotoSmall = (state: AppStateType) => state.profileReducer.profileData.photos.small;
const getIsLoading_compProfile = (state: AppStateType) => state.profileReducer.isLoading;
const getStatusField = (state: AppStateType) => state.profileReducer.statusField;
const getMyAvatarSmall = (state: AppStateType) => state.profileReducer.myAvatarSmall;
const getMyAvatarLarge = (state: AppStateType) => state.profileReducer.myAvatarLarge;
const getIsFollowed = (state: AppStateType) => state.profileReducer.isFollowed;
const getIsFollowing = (state: AppStateType) => state.profileReducer.isFollowing;
const getIsonFollowingErr = (state: AppStateType) => state.profileReducer.onFollowingErr;

// ProfileReducerPart_2
const getErrOnProfileLoading = (state: AppStateType) => state.profileReducer.errOnProfileLoading;
const getErrOnStatusLoading = (state: AppStateType) => state.profileReducer.errOnStatusLoading;
const getErrOnStatusUpdate = (state: AppStateType) => state.profileReducer.errOnStatusUpdate;
const getErrOnAvatarUpdate = (state: AppStateType) => state.profileReducer.errOnAvatarUpdate;
const MSGToUserSended = (state: AppStateType) => state.profileReducer.MSGToUserSended;
const errAtMSGSending = (state: AppStateType) => state.profileReducer.errAtMSGSending;


const ProfileReducerPart_1 = createSelector(getWallPosts, getWallPostsLength,
    getProfileData, getProfileDataPhotoLarge, getProfileDataPhotoSmall, getIsLoading_compProfile, getStatusField, getMyAvatarSmall,
    getMyAvatarLarge, getIsFollowed, getIsFollowing, getIsonFollowingErr,
    (wallPosts, WallPostsLength, profileData, large, small, isLoading, statusField, myAvatarSmall, myAvatarLarge, isFollowed, isFollowing, onFollowingErr,) => {
        let ProfilePart_1 = { wallPosts, WallPostsLength, profileData, large, small, isLoading, statusField, myAvatarSmall, myAvatarLarge, isFollowed, isFollowing, onFollowingErr, }
        return ProfilePart_1
    })

const ProfileReducerPart_2 = createSelector(getErrOnProfileLoading, getErrOnStatusLoading, getErrOnStatusUpdate, getErrOnAvatarUpdate, MSGToUserSended, errAtMSGSending, getWallPostsLength,
    (errOnProfileLoading, errOnStatusLoading, errOnStatusUpdate, errOnAvatarUpdate, MSGToUserSended, errAtMSGSending, wallPostsLength) => {
        let ProfilePart_2 = { errOnProfileLoading, errOnStatusLoading, errOnStatusUpdate, errOnAvatarUpdate, MSGToUserSended, errAtMSGSending, wallPostsLength }
        return ProfilePart_2
    })

export const getSmartProfileMediaData = createSelector(ProfileReducerPart_1, ProfileReducerPart_2, (ProfilePart_1, ProfilePart_2) => {
    return { ...ProfilePart_1, ...ProfilePart_2 }
})

//
// old getSmartProfileMediaData was here
//


// pics and gifs to Profile
// const getTheme                            = state =>  state.backgroundReducer.theme                             ;
// const getAuth_LDR_GIF                     = state =>  state.backgroundReducer.auth_LDR_GIF                      ;
const getAva_LDR_GIF = (state: AppStateType) => state.backgroundReducer.profileThemes.ava_LDR_GIF;
const getBTN_LDR_GIF = (state: AppStateType) => state.backgroundReducer.profileThemes.BTN_LDR_GIF;
const getStatus_LDR_GIF = (state: AppStateType) => state.backgroundReducer.profileThemes.status_LDR_GIF;
const getPanoramaPic = (state: AppStateType) => state.backgroundReducer.profileThemes.panoramaPic;
const getPanorama_LDR_GIF = (state: AppStateType) => state.backgroundReducer.profileThemes.panorama_LDR_GIF;

export const getSmartPicsNLoaders = createSelector(getTheme, getAuth_LDR_GIF, getAva_LDR_GIF, getBTN_LDR_GIF, getStatus_LDR_GIF,
    getPanoramaPic, getPanorama_LDR_GIF,
    (theme, auth_LDR_GIF, ava_LDR_GIF, BTN_LDR_GIF, status_LDR_GIF, panoramaPic, panorama_LDR_GIF) => {
        return { colorTheme: theme, auth_LDR_GIF, ava_LDR_GIF, BTN_LDR_GIF, status_LDR_GIF, panoramaPic, panorama_LDR_GIF }
    });

// DIALOGS RESELECTORS===============================================================================================================DIALOGS RESELECTORS============
export const getDialogsACs_compDialogs = (state: AppStateType) => state.dialogACs;
export const getDialogsReducer = (state: AppStateType) => state.dialogsReducer;
// initial Dialogs Reducer's state in reselector's controle
const getDialogsList = (state: AppStateType) => state.dialogsReducer.dialogsList;
const getCertainDialog = (state: AppStateType) => state.dialogsReducer.certainDialog;
const getAllDialogsIsLoading = (state: AppStateType) => state.dialogsReducer.allDialogsIsLoading;
const getCertainDialogIsLoading = (state: AppStateType) => state.dialogsReducer.certainDialogIsLoading;

const getDefaultAvatar_compDialogs = (state: AppStateType) => state.dialogsReducer.defaultAvatar;
const getcertainDialogLoader = (state: AppStateType) => state.dialogsReducer.certainDialogLoader;
const getAllDialogsLoader = (state: AppStateType) => state.dialogsReducer.allDialogsLoader;
const getNewMessagesCounter = (state: AppStateType) => state.dialogsReducer.newMessagesCounter;
const getNewMessageBTNDisabled = (state: AppStateType) => state.dialogsReducer.newMessageBTNDisabled;
// const getMsgLoader                      = state => state.dialogsReducer.msgLoader                                ;
const getPrevMsgsIsLoading = (state: AppStateType) => state.dialogsReducer.prevMsgsIsLoading;
const getPrevMsgsLoader = (state: AppStateType) => state.dialogsReducer.prevMsgsLoader;
const getOnError = (state: AppStateType) => state.dialogsReducer.onError;
// const getErrGettingNewMSGSCount         = state => state.dialogsReducer.errGettingNewMSGSCount                   ;
const getOnSendMSGStatArr = (state: AppStateType) => state.dialogsReducer.onSendMSGStatArr;
const getKeyArr = (state: AppStateType) => state.dialogsReducer.keyArr;
const getFeedbackArr_compDialogs = (state: AppStateType) => state.dialogsReducer.feedbackArr;
const getErrNegotiatorsListGet = (state: AppStateType) => state.dialogsReducer.errNegotiatorsListGet;
const getErrNegotiatorsListPIC = (state: AppStateType) => state.dialogsReducer.errNegotiatorsListPIC;
const getErrCertainDialogGet = (state: AppStateType) => state.dialogsReducer.errCertainDialogGet;

const DialogsReducerPart_1 = createSelector(getDialogsList, getCertainDialog, getAllDialogsIsLoading, getCertainDialogIsLoading, getDefaultAvatar_compDialogs,
    getcertainDialogLoader, getAllDialogsLoader, getNewMessagesCounter, getNewMessageBTNDisabled, getMsgLoader, getPrevMsgsIsLoading, getPrevMsgsLoader,
    (dialogsList, certainDialog, allDialogsIsLoading, certainDialogIsLoading, defaultAvatar, certainDialogLoader, allDialogsLoader, newMessagesCounter,
        newMessageBTNDisabled, msgLoader, prevMsgsIsLoading, prevMsgsLoader) => {
        let DialogsPart_1 = {
            dialogsList, certainDialog, allDialogsIsLoading, certainDialogIsLoading, defaultAvatar, certainDialogLoader, allDialogsLoader, newMessagesCounter,
            newMessageBTNDisabled, msgLoader, prevMsgsIsLoading, prevMsgsLoader
        }
        return DialogsPart_1
    })

const DialogsReducerPart_2 = createSelector(getOnError, getErrGettingNewMSGSCount, getOnSendMSGStatArr, getKeyArr, getFeedbackArr_compDialogs,
    getErrNegotiatorsListGet, getErrNegotiatorsListPIC, getErrCertainDialogGet,
    (onError, errGettingNewMSGSCount, onSendMSGStatArr, keyArr, feedbackArr, errNegotiatorsListGet, errNegotiatorsListPIC, errCertainDialogGet,) => {
        let DialogsPart_2 = { onError, errGettingNewMSGSCount, onSendMSGStatArr, keyArr, feedbackArr, errNegotiatorsListGet, errNegotiatorsListPIC, errCertainDialogGet, }
        return DialogsPart_2
    })

export const getSmartDialogsReducer = createSelector(DialogsReducerPart_1, DialogsReducerPart_2, (DialogsPart_1, DialogsPart_2) => {
    return { ...DialogsPart_1, ...DialogsPart_2 }
})

//
// getSmartDialogsReducer was here 
//


// USERS RESELECTORS===============================================================================================================USERS RESELECTORS==============

export const getUsersACs = (state: AppStateType) => state.usersACs;
export const getDialogsACs_compUsers = (state: AppStateType) => state.dialogACs;
//in reSelector control
const getInitialUserList = (state: AppStateType) => state.usersReducer.initialUsersList;
const getPageSize = (state: AppStateType) => state.usersReducer.pageSize;
const getTotalCount = (state: AppStateType) => state.usersReducer.totalCount;
const getCurrentPage = (state: AppStateType) => state.usersReducer.currentPage;
const getLinkTermName = (state: AppStateType) => state.usersReducer.linkTermName;
const getIsLoading_compUsers = (state: AppStateType) => state.usersReducer.isLoading;
const getDefaultAvatar = (state: AppStateType) => state.usersReducer.defaultAvatar;
const getFollowingInProgress = (state: AppStateType) => state.usersReducer.followingInProgress;
const getUserSearchMode = (state: AppStateType) => state.usersReducer.userSearchMode;
const getUsersGettingError = (state: AppStateType) => state.usersReducer.usersGettingError;
const getUserNotFound = (state: AppStateType) => state.usersReducer.userNotFound;
const getUserFindingError = (state: AppStateType) => state.usersReducer.userFindingError;
const getUserNotFoundGIF = (state: AppStateType) => state.usersReducer.userNotFoundGIF;
const getMSGStat = (state: AppStateType) => state.dialogsReducer.onSendMSGStatArr;
const getFeedbackArr = (state: AppStateType) => state.dialogsReducer.feedbackArr;
const getGeneralLDR_GIF = (state: AppStateType) => state.backgroundReducer.usersThemes.generalLDR_GIF;


const UsersReducerPart_1 = createSelector(getInitialUserList, getPageSize, getTotalCount, getCurrentPage,/* */getLinkTermName,/* */getIsLoading_compUsers,
    getDefaultAvatar, getFollowingInProgress, getUserSearchMode, getUsersGettingError, getUserNotFound,
    (initialUsersList, pageSize, totalCount, currentPage, linkTermName, isLoading, defaultAvatar, followingInProgress, userSearchMode,
        usersGettingError, userNotFound,) => {
        let UsersPart_1 = {
            initialUsersList, pageSize, totalCount, currentPage, linkTermName, isLoading, defaultAvatar, followingInProgress, userSearchMode,
            usersGettingError, userNotFound,
        }
        return UsersPart_1
    })

const UsersReducerPart_2 = createSelector(getUserFindingError, getMSGStat, getFeedbackArr, getGeneralLDR_GIF, getUserNotFoundGIF,
    (userFindingError, onSendMSGStatArr, feedbackArr, generalLDR_GIF, userNotFoundGIF,) => {
        let UsersPart_2 = { userFindingError, onSendMSGStatArr, feedbackArr, generalLDR_GIF, userNotFoundGIF, }
        return UsersPart_2
    })

export const getSmartUsersMediaData = createSelector(UsersReducerPart_1, UsersReducerPart_2, (UsersPart_1, UsersPart_2) => {
    return { ...UsersPart_1, ...UsersPart_2 }
})

export type SmartUserMediaData_Type = typeof getSmartUsersMediaData


// FRIENDS RESELECTORS===============================================================================================================FRIENDS RESELECTORS==============

export const getFriendsACs = (state: AppStateType) => state.friendsACs

//in reSelector control
const getFiendsList = (state: AppStateType) => state.friendsReducer.friendsList;
const getDefaultAvatar_compFriends = (state: AppStateType) => state.friendsReducer.defaultAvatar;
const getFollowingInProgress_compFriends = (state: AppStateType) => state.friendsReducer.followingInProgress;
const getErrOnGettingFriends = (state: AppStateType) => state.friendsReducer.errOnGettingFriends;

export const GetSmartFriendsReducer = createSelector(getFiendsList, getDefaultAvatar_compFriends, getFollowingInProgress_compFriends,
    getErrOnGettingFriends, (friendsList, defaultAvatar, followingInProgress, errOnGettingFriends) => {
        return { friendsList, defaultAvatar, followingInProgress, errOnGettingFriends }
    })


// CHAT RESELECTORS===============================================================================================================CHAT RESELECTORS==============

export const getChatACs = (state: AppStateType) => state.chatACs;

const getChatArr = (state: AppStateType) => state.chatReducer.chatArr;
const getreadyStatus = (state: AppStateType) => state.chatReducer.readyStatus;
const getWebSocket = (state: AppStateType) => state.chatReducer.webSocket;
const getDefaultAvatar_compChat = (state: AppStateType) => state.chatReducer.defaultAvatar;

export const getSmartChatReducer = createSelector(getChatArr, getreadyStatus, getWebSocket, getDefaultAvatar_compChat, (chatArr, readyStatus, webSocket, defaultAvatar) => {
    return { chatArr, readyStatus, webSocket, defaultAvatar }
})