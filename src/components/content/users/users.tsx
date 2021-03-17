import React, { useState, useEffect, useRef, SyntheticEvent, Fragment } from "react";
import stl from './users.module.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Field, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { ForUsersSomeAttrs } from "../../../redux/dialogsReducer";
import { UsersThemes_Type, usersActions_Type } from "./usersContainer";
import { InitialUsersInfo_Type } from "../../../redux/usersReducer";
import { UsersThemesBGR_Type } from "../../../redux/backGroundSetter";
import * as queryString from 'querystring'
// import UnAuthorised                       from "../unAuthorised/unAuthorised";


type UsersProps_Type = {
  themes: UsersThemes_Type
  usersInfo: InitialUsersInfo_Type & UsersThemesBGR_Type & ForUsersSomeAttrs
  usersFuncs: usersActions_Type
}

export let Users: React.FC<UsersProps_Type> = ({ themes, usersInfo, usersFuncs }) => {
  // console.log(usersInfo.onSendMSGStatArr)
  // console.log(usersInfo.feedbackArr)

  type Error_Type = { text?: string }
  type Value_Type = { text: string }

  let [isDisabled, setIsDisabled] = useState(false);
  let [wrapperLocker, setWrapperLocker] = useState('');
  let [portionNumber, setPortionNumber] = useState(1);
  let [searchMode, setSearchMode] = useState(false);
  let [userSearchName, setUserSearchName] = useState<string>('')

  let history = useHistory();
  // console.log(history)


  let paginator = () => {
    let pageStep = 10;
    let pagesAmount = Math.ceil(usersInfo.totalCount / usersInfo.pageSize)
    let leftPortionPageNumber = (portionNumber - 1) * pageStep + 1
    let rightPortionPageNumber = portionNumber * pageStep;
    let portionCount = Math.ceil(pagesAmount / pageStep)
    let pagesArr = [];
    for (let i = 1; i <= pagesAmount; i++) { pagesArr.push(i) }

    return !!pagesAmount && <div className={stl.paginationBlockOutside} >
      <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={() => setPortionNumber(portionNumber - 1)}
        disabled={portionNumber === 1}> &#171; {pageStep} </button>
      {pagesArr
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return <span key={p} className={usersInfo.currentPage === p ? `${stl.paginationSelected} ${themes.paginationSelectedDnmc}` :
            `${stl.pagination} ${themes.paginationDnmc}`}
            onClick={() => {
              // debugger;
              searchMode ?
                usersInfo.currentPage !== p && usersFuncs.getCertainUserThunk(usersInfo.pageSize, userSearchName, p) :
                usersInfo.currentPage !== p && setPageListener(usersInfo.pageSize, p)
            }}
          >{p}
          </span>
        })}
      <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} onClick={() => setPortionNumber(portionNumber + 1)}
        disabled={
          // pageStep > pagesAmount ||
          portionNumber > portionCount - 1
        }> {pageStep} &#187;</button>
    </div>
  };

  // let userName = usersInfo.userSearchField;

  let setPageListener = (pageSize: number, page: number) => {
    usersFuncs.setCurrentPageThunk(pageSize, page);
    wrapperLocker && setWrapperLocker(''); isDisabled && setIsDisabled(false);
  };


  let queryRequest = useLocation().search;
  let parsedString = queryString.parse(queryRequest);
  // console.log(parsedString);

  useEffect(() => { if (parsedString['term'] && parsedString['term'] !== '') { setSearchMode(true); setUserSearchName(parsedString['term'] as string) } }, [])

  let friendsSeekerSubmitter = (userName: Value_Type, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSearchMode(true)
    setUserSearchName(userName.text)
    history.push({ pathname: 'users', search: `?page=${usersInfo.currentPage}&term=${userName.text}` })
    let { pageSize } = usersInfo;
    usersFuncs.getCertainUserThunk(pageSize, userName.text.trim(), 1)
    setSubmitting(false);
  }

  let searchModeCloseListener = () => {
    if (searchMode) {
      usersFuncs.setCurrentPageThunk(50, 1); setSearchMode(false);
      history.push({ pathname: 'users', search: `?page=${usersInfo.currentPage}` })
    } usersFuncs.setErrorToNull();
  };

  // let feedbackArr = usersInfo.feedbackArr;

  // useEffect(()=>{
  //     // console.log(feedbackArr)
  //     let index = feedbackArr.findIndex(el=>{ return el && el.id===feedBackRef.current.id });
  //     // if (index ===-1 && feedBackRef.current ) props.feedbackRefPush(feedBackRef.current);
  //     if (index ===-1 && feedBackRef.current ) setFeedBackArr(feedbackArr.concat(feedBackRef.current));
  //     // console.log(feedbackArr)
  //     for (let i=0; i<=feedbackArr.length; i++){

  //         // props.feedbackArr[i]&&console.log(feedbackArr[i].className)
  //         if (feedbackArr[i])  {feedbackArr[i].className = `${stl.feedbackHidden}`
  //             console.log(feedbackArr[i].className)}

  //         // props.feedbackArr[i] && console.log(props.feedbackArr[i].className)
  //         // props.feedbackArr[i] && setTimeout( ()=> { localFeedbackArr[i].className = `${localFeedbackArr[i].className} ${stl.feedbackHidden}`},3000);
  //         // if (props.feedbackArr[i]) {
  //         //     localFeedbackArr[i].className = `${localFeedbackArr[i].className} ${stl.feedbackHidden}`;

  //         //     console.log(localFeedbackArr[i].className)
  //         // }
  //         // if (props.feedbackArr[i]) props.feedbackArr[i].className = `${feedBackRef.current.className} ${stl.feedbackHidden}`;

  //         // setTimeout(()=>{ if(feedBackRef.current !== null) feedBackRef.current.className = `${feedBackRef.current.className} ${stl.feedbackHidden}`},4000);  //через 5 сек анимация плавного убирания на 3 секунды
  //         // setTimeout(()=>{ props.feedBackWindowCloser(i) },7000);  // через 8 секунд объект удаляется из DOM
  //         }
  //         // console.log(feedbackArr)
  //     // }

  // },[usersInfo.onSendMSGStatArr.length]);

  // setTimeout( ()=> {console.log(feedbackArr)},9000 )

  let firstBlockClass = `${stl.userUnit} ${themes.userUnitDnmc} ${stl.userUnitShowed}`;
  let secondBlockClass = `${stl.userWriteMode} ${themes.userWriteModeDnmc} ${stl.userUnitShowed}`;

  let [isHidden, setIsHidden] = useState<null | string>(null)

  let postClass = () => { setTimeout(() => { setIsHidden(stl.feedbackHidden); return isHidden }, 3000) }

  // console.log(usersInfo.onSendMSGStatArr)

  let validator = (values: Value_Type) => { let errors: Error_Type = {}; if (!values.text.trim()) { values.text = ''; errors.text = 'Required' } return errors }

  let formSubmitter = (userId: number, textValue: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    let actionKey: string = uuidv4()
    usersFuncs.sendMessageToUserThunk(userId, textValue.text, actionKey, userName);
    textValue.text = ''; setSubmitting(false);
  }

  type ModalMsgs_Type = { servInfo: { clientX?: number, clientY?: number, flag?: boolean, closer?: any }[] }
  let [writeMsgMode, setWriteMsgMode] = useState<ModalMsgs_Type>({ servInfo: [] })
  let userIdTalkModeOn = (e: any, i: number, arr: any) => {
    setWrapperLocker(stl.wrapperLocked);
    // setIsDisabled(true);
    e.target.parentElement.parentElement.parentElement.parentElement.children[0].className = stl.userUnitHidden;
    let newServInfo = [...writeMsgMode.servInfo]
    if (newServInfo[i] === undefined) { newServInfo[i] = {} }
    if (newServInfo[i]?.flag === undefined) { newServInfo[i].flag = true; }
    else if (newServInfo[i].flag === true) { newServInfo[i].flag = false; }
    else if (newServInfo[i].flag === false) { newServInfo[i].flag = true; }
    newServInfo[i].closer = (index: number, event: any) => modalCloser(index, event)
    let finalState = { servInfo: newServInfo }
    setWriteMsgMode(writeMsgMode = finalState)
  }

  type indexEl_Type = { index: number, elem: any }  // хз какой тип элемента должен быть
  let [indexEl, setIndexEl] = useState<indexEl_Type>({ index: -1, elem: '' })
  useEffect(() => {
    if (indexEl.index >= 0) {
      let newServInfo = [...writeMsgMode.servInfo]
      newServInfo[indexEl.index].flag = false
      let finalState = { servInfo: newServInfo }
      indexEl.elem.className = firstBlockClass
      setWriteMsgMode(writeMsgMode = finalState)
      setWrapperLocker(stl.wrapperUnlocked);
      setIsDisabled(false);
    }
  }, [indexEl])

  let modalCloser = (i: number, e: any) => { setIndexEl({ index: i, elem: e }) }

  // newFeedbackArr.forEach((el, i) => {
  //   if (el.statNum !== 0) {
  //     debugger
  //     setTimeout(() => { newFeedbackArr.splice(i, 1) }, 3000)
  //   }
  // })

  return <>
    <div className={`${stl.usersPage} ${themes.userPageDnmc}`} >
      <div className={stl.userInfo}>
        <div className={`${stl.generalHeader} ${themes.generalHeaderDnmc}`}>
          <h2 className={stl.userHeader}>Users</h2>
          {paginator()}
          <div className={stl.searchBlock} >
            <Formik initialValues={{ text: parsedString.term as string || '' }} validate={validator} onSubmit={friendsSeekerSubmitter}>
              {({ values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting, handleReset }) => (
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <Field name="text" type="text" value={values.text} onChange={handleChange} placeholder={errors.text} className={`${stl.searchInput} ${themes.searchInputDnmc}`} />
                  <button type="submit" disabled={isSubmitting} className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} >Find!</button>
                  <button className={`${stl.pagBTN} ${themes.pagBTNDnmc}`} type="reset" onClick={searchModeCloseListener} >X</button>
                </form>
              )}
            </Formik>
          </div>
        </div>
        {/*props.usersInfo.usersGettingError*/}
        {usersInfo.isLoading ?                      // список юзеров грузится?
          <div className={stl.loaderDiv}>
            <img className={stl.loader} src={usersInfo.generalLDR_GIF} alt="Err" />
          </div> :
          usersInfo.usersGettingError || usersInfo.userFindingError ?                            // ошибка при поиске юзеров?
            <div className={stl.Houston}>
              <h2>Houston, we've got a problem...</h2>
              <h2>{usersInfo.usersGettingError || usersInfo.userFindingError}</h2>
              {usersInfo.usersGettingError && <button
                className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`}
                onClick={() => { usersFuncs.setErrorToNull(); setPageListener(usersInfo.pageSize, usersInfo.currentPage); }}
              >Try again</button>}
            </div>
            :
            usersInfo.userNotFound && !usersInfo.initialUsersList.length ?                           // ничего не найдено при кастомном поиске?
              <div className={stl.nobodyFound}>
                <img src={usersInfo.userNotFoundGIF} alt="Err" />
                <h2>{usersInfo.userNotFound} =(</h2>
              </div> :

              <div className={`${stl.mapWrapper} ${themes.mapWrapperDnmc} ${wrapperLocker}`}>
                {usersInfo?.initialUsersList
                  .map((user, i, users) =>
                    <div className={stl.userUnitContainer} key={i}>
                      <div className={`${stl.userUnit} ${themes.userUnitDnmc} ${stl.userUnitShowed}`} >
                        <div className={stl.avaDiv}>
                          <NavLink to={`/profile/${user.id}`}>
                            <img src={user.photos.large || usersInfo.defaultAvatar} alt='err'
                              className={`${themes.userAvaDnmc}`} />
                          </NavLink>
                        </div>
                        <div className={stl.nameStateBTNs}>

                          <div className={stl.userBlockInfo}>
                            <NavLink to={`/profile/${user.id}`}>
                              <h2 className={`${stl.userName} ${themes.userNameDnmc}`}>{user.name} </h2>
                            </NavLink>
                            <p /* className={`${themes.userNameDnmc}`} */ >{user.status}</p>
                          </div>
                          <div className={stl.followNWriteBTNS}>
                            <button
                              disabled={usersInfo.followingInProgress.some((id: any) => id == user.id)}
                              id={user.id}
                              className={`${stl.followBTN} ${themes.followBTNDnmc} ${user.error && themes.followBTN_ERR_DNMC}`}
                              onClick={() => usersFuncs.followThunkToggler(user.id, user.followed)}
                            >
                              {user.error ? user.error : user.followed ? 'unFollow' : 'Follow'}
                            </button>
                            <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}
                              disabled={isDisabled}
                              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => userIdTalkModeOn(e, i, users)}
                            >Write message </button>
                          </div>
                        </div>
                      </div>
                      {writeMsgMode.servInfo[i]?.flag ?
                        <WriterMode themes={themes} userEl={users[i]} sendMsg={usersFuncs.sendMessageToUserThunk} index={i} srvInfo={writeMsgMode.servInfo[i]} /> : null}
                    </div >
                  )}
              </div>
        }
      </div>
      <div className={`${stl.moreUserUnits}  ${themes.moreUserUnitsDnmc}`}>
        <button className={`${stl.moreUsersShower} ${themes.pagBTNDnmc}`}
          onClick={() => console.log('show more content')}>Show More
                </button>
      </div>
    </div>
    {usersInfo.feedbackArr.map((el, i, arr) => {
      // console.log(1);

      return <FeedBacker key={el.actionKey}
        feedBackWindowCloser={usersFuncs.feedBackWindowCloser}
        statInfo={arr[i]}
        index={i}
      />
    })}
  </>
}

// let WriterMode = ({ themes }: UsersThemes_Type) => {
let WriterMode = React.memo(({ themes, userEl, sendMsg, index, srvInfo }: any) => {  // Прикруитть нормальную типизацию
  // console.log(1)

  type Error_Type = { text?: string }
  type Value_Type = { text: string }
  let validator = (values: Value_Type) => { const errors: Error_Type = {}; if (!values.text) { errors.text = 'Required' } return errors }

  let formSubmitter = (userId: number, textValue: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    let actionKey: string = uuidv4()
    sendMsg(userId, textValue.text, actionKey, userName);
    textValue.text = ''; setSubmitting(false);
  }
  let keyCodeChecker = (e: KeyboardEvent, userId: number, values: Value_Type, userName: string, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    if (e.keyCode == 13 && e.shiftKey) { return } // для переноса строки =)
    else if (e.keyCode === 13) { formSubmitter(userId, values, userName, { setSubmitting }) }
  }

  let closeAction = (index: number, elem: any) => {
    let element = elem.parentElement.parentElement.parentElement.parentElement.children[index].children[0]
    srvInfo.closer(index, element)
  }

  return <div className={`${stl.userWriteMode} ${themes.userWriteModeDnmc} ${stl.userUnitShowed}`}>

    <div className={stl.miniHeadWrapper}>
      <h2 className={`${stl.userName} ${themes.userNameDnmc}`}>{userEl.name}</h2>
      <button className={`${stl.followBTN} ${themes.followBTNDnmc}`}>Go to chat</button>   {/* // добавить логику перехода в чат */}
      <button className={`${stl.closeBTN} ${stl.followBTN} ${themes.followBTNDnmc}`}
        // onClick={e => { userIdTalkModeOff(e) }}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { closeAction(index, e.target) }}
      >X</button>
    </div>
    <div className={stl.textAreaWrapper}>
      <Formik initialValues={{ text: '' }} validate={validator}
        onSubmit={(values, { setSubmitting }) => {
          formSubmitter(userEl.id, values, userEl.name, { setSubmitting }); values.text = ''; setSubmitting(false);
        }}>
        {({ values, errors, handleChange, handleSubmit, isSubmitting, setSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Field name="text" className={stl.talkTextarea} as='textarea'
              onChange={handleChange} value={values.text} placeholder={errors.text}
              onKeyDown={(e: KeyboardEvent) => (keyCodeChecker(e, userEl.id, values, userEl.name, { setSubmitting }))}
            />
            <button type="submit" disabled={isSubmitting} className={`${stl.followBTN} ${themes.followBTNDnmc}`}
            > Send Msg </button>
          </form>
        )}
      </Formik>
    </div>
  </div>

})


interface FBProps_Type {
  feedBackWindowCloser: (arrIndex: number) => void
  statInfo: any
  index: number
}

const FeedBacker = React.memo(({ feedBackWindowCloser, statInfo, index }: FBProps_Type) => {

  console.log(index)
  let feedBackNamer = (i: number) => {
    if (i === 0) return `${stl.feedbackWindow0}`
    else if (i === 1) return `${stl.feedbackWindow1}`
    else if (i >= 2) return `${stl.feedbackWindow2}`
  }

  useEffect(() => { statInfo.statNum !== 0 && setTimeout(() => { feedBackWindowCloser(index) }, 3000) }, [statInfo.statNum])


  let feedBackCloser = (i: number) => { feedBackWindowCloser(i) }


  return <div className={feedBackNamer(index)}>
    <button onClick={() => feedBackCloser(index)}> X</button>
    <p>{statInfo.statNum === 0 && 'Sending message...' ||
      statInfo.statNum === 1 && `Message delivered to ${statInfo.userName}` ||
      statInfo.statNum === 2 && `Failed to deliver message to ${statInfo.userName} `}
    </p>
  </div>
},
  function areEqual(prevProps, nextProps) {
    // return prevProps.sendingMSGStatArr.length !== nextProps.sendingMSGStatArr.length
    return false
  })











// const FeedBacker = React.memo(({ sendingMSGStatArr, feedBackWindowCloser }: FBProps_Type) => {
//   // console.log(sendingMSGStatArr)
//   console.log(123)
//   let feedBackRef = useRef<HTMLDivElement | null>(null);

//   let feedBackNamer = (i: number, statNum: number, /* feedBackRef:HTMLDivElement */) => {

//     // feedBackRef.current && console.log(feedBackRef.current.getAttribute('data-name'));
//     // feedBackRef.current && feedBackRef.current.setAttribute('data-name', 'fuck-off блять!!!');
//     // feedBackRef.current && console.log(feedBackRef.current.getAttribute('data-name'));

//     // feedBackRef.current && console.log(feedBackRef.current.attributes.getNamedItem('data-name'));
//     // feedBackRef.current && console.log(feedBackRef.current.attributes[0].nodeValue);
//     // feedBackRef.current && feedBackRef.current.attributes.setNamedItem({'data-name': 'on'});
//     // feedBackRef.current && console.log(feedBackRef.current.attributes.getNamedItem('data'));
//     // feedBackRef.current && console.log(feedBackRef.current.attributes.attributes[0]);

//     if (i === 0) { return `${stl.feedbackWindow0}`; }

//     if (statNum === 0) { }
//     // console.log(1); /*feedBackCloserTimeOut(i);*/}
//     if (i === 1) return stl.feedbackWindow1
//     if (i >= 2) return stl.feedbackWindow2
//   }

//   let attributer = (i: number) => { feedBackCloserTimeOut(i); return 'off' }

//   let feedBackCloser = (i: number) => { feedBackWindowCloser(i) }

//   let feedBackCloserTimeOut = (i: number) => { setTimeout(() => { feedBackWindowCloser(i) }, 5000) }

//   return <>
//     {sendingMSGStatArr.map((el, i) => {
//       let cycleId = uuidv4()
//       // feedBackRef.current && el.statNum !== 0 && attributer(feedBackRef, cycleId)

//       return <div ref={feedBackRef}
//         data-flag={attributer(i)}
//         key={cycleId}
//         id={cycleId}
//         className={feedBackNamer(i, el.statNum)}
//       >
//         <button onClick={() => feedBackCloser(i)}> X</button>
//         <p>{el.statNum === 0 && 'Sending message...' ||
//           el.statNum === 1 && `Message delivered to ${el.userName}` ||
//           el.statNum === 2 && `Failed to deliver message to ${el.userName} `}
//         </p>
//       </div>
//     })}
//   </>
// },
//   function areEqual(prevProps, nextProps) {
//     return prevProps.sendingMSGStatArr.length !== nextProps.sendingMSGStatArr.length
//   })






//         // let flag;
//         // let res1=[];
//         // let res2=[];
//         //
//         // if (!prevProps.sendingMSGStatArr.length && !nextProps.sendingMSGStatArr.length){flag = false}
//         // else if (prevProps.sendingMSGStatArr.length !== nextProps.sendingMSGStatArr.length){flag = false}
//         // else {
//         //
//         //     for(let i=0,j=0; i<prevProps.sendingMSGStatArr.length,j<nextProps.sendingMSGStatArr.length; i++,j++){
//         //         for (let key1 in prevProps.sendingMSGStatArr[i]){res1.push(key1+prevProps.sendingMSGStatArr[i][key1])}
//         //         for (let key2 in nextProps.sendingMSGStatArr[j]){res2.push(key2+nextProps.sendingMSGStatArr[j][key2])}
//         //     }
//         //     console.log(res1)
//         //     console.log(res2)
//         //     for (let i=0; i<res1.length; i++){
//         //         if (res1[i]==res2[i]) {
//         //             console.log(2)
//         //             console.log(res1[i]===res2[i])
//         //
//         //             flag = false;
//         //             break;
//         //         }
//         //         console.log(5);
//         //         flag = true
//         //     }
//         // }
//         // // console.log(flag)
//         // return flag
//     }
// )

