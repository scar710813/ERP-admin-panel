import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { selectCurrentUser, useGetMeQuery } from "../../me"
import { useVerifyQuery } from "../services/authApiSlice"
import { selectIsLogin } from "../services/authSlice"
import PageLoading from "../../../layout/PageLoading"
import { useEffect } from "react"

const VerifyLogin = () => {
  const isLogin = useSelector(selectIsLogin)
  const currentUser = useSelector(selectCurrentUser)

  const { data: verifiedUser } = useVerifyQuery(null, {
    skip: !isLogin,
  })

  useGetMeQuery(null, {
    skip: !verifiedUser || !isLogin,
  })

  useEffect(() => {
    console.log("VerifyLogin isLogin", isLogin)
    console.log("VerifyLogin currentUser", currentUser)
    console.log("VerifyLogin verifiedUser", verifiedUser)
  }, [isLogin, currentUser, verifiedUser])
  let content

  if (isLogin && (!verifiedUser || !currentUser)) {
    content = <PageLoading />
  } else {
    content = <Outlet />
  }

  return content
}

export default VerifyLogin
