import { Box } from "@mui/system"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Button, Stack, Typography, Link as MuiLink } from "@mui/material"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import { useLoginMutation } from "../services/authApiSlice"
import { LoginSchema } from "../utils/schema"
import initLoginVal from "../utils/initLoginVal"
import {
  FLoadingBtn,
  FPwdTextfield,
  FTextfield,
} from "../../../components/form"
import useToggle from "../../../hooks/useToggle"
import GoogleOneTapLogin from "./GoogleOneTapLogin"

const LoginForm = () => {
  const { t } = useTranslation()

  const [isRegister, setIsRegister] = useState(false)
  const {
    multiViable: showPassword,
    handleSetMultiVisibility: handleShowPasswords,
  } = useToggle({
    password: false,
    okPassword: false,
  })

  const [login] = useLoginMutation()

  const formikConfig = {
    initialValues: initLoginVal,
    enableReinitialize: true,
    validationSchema: LoginSchema(isRegister),
    onSubmit: async (values) => {
      await login({
        email: values.email,
        password: values.password,
      })
    },
  }
  return (
    <Formik {...formikConfig}>
      <Form autoComplete="off">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FTextfield name="email" label={t("email")} />
          {isRegister && <FTextfield name="name" label={t("name")} />}
          <FPwdTextfield
            name="password"
            label={t("password")}
            isShowValue={showPassword.password}
            setIsShowValue={() => handleShowPasswords("password")}
          />
          {isRegister && (
            <FPwdTextfield
              name="okPassword"
              label={t("confirmPwd")}
              isShowValue={showPassword.okPassword}
              setIsShowValue={() => handleShowPasswords("okPassword")}
            />
          )}
          <FLoadingBtn> {t("submit")}</FLoadingBtn>

          <GoogleOneTapLogin />
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography component="span" variant="body2">
            {!isRegister ? t("dontHaveAcc") : t("haveAcc")}
          </Typography>
          <Button
            sx={{
              fontSize: (theme) => theme.typography.body,
            }}
            color="primary"
            onClick={() => setIsRegister(!isRegister)}
            size="large"
          >
            {!isRegister ? t("createNow") : t("signInNow")}
          </Button>
          <br />
          <MuiLink component={Link} variant="body2" to="/forget-password">
            {t("forgotPwd")}
          </MuiLink>
        </Box>
      </Form>
    </Formik>
  )
}
export default LoginForm
