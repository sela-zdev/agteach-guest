import React, { useState } from "react";
import {
  Box,
  Button,
  OutlinedInput,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "../../services/api/userApi";
import { CustomAlert } from "../../components/CustomAlert";
import { useTranslation } from "react-i18next";

export const ChangePassword = () => {
  const [t] = useTranslation("global");
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [resetPassword, { isError, error, isLoading, isSuccess }] =
    useUpdatePasswordMutation();

  const onSubmit = async (formData) => {
    const res = await resetPassword(formData);
    if (res.data?.status === "success") reset();

    setOpen(true);
  };

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    retype: false,
  });

  const handleTogglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validatePassword = (value) => {
    if (!/[a-z]/.test(value))
      return t("signup.passwordMustContainLowercase");
    if (!/[A-Z]/.test(value))
      return t("signup.passwordMustContainUppercase");
    if (!/\d/.test(value)) return t("signup.passwordMustContainNumber");
    if (!/[@$!%*?&]/.test(value))
      return t("signup.passwordMustContainSpecialCharacter");
    return true;
  };

  return (
    <>
      <Stack sx={{ m: 2, gap: 2 }}>
        <Typography variant="h4">{t("guestProfile.changePasswordSection")}</Typography>
        {/* Current Password Field */}
        <CustomAlert
          label={
            isError
              ? error.data.message
              : isSuccess
                ? t('guestProfile.successfullyUpdatedPassword')
                : t('guestProfile.errorUpdated')
          }
          severity={isError ? "error" : "success"}
          open={open}
          onClose={() => setOpen(false)}
        />
        <FormControl variant="outlined" error={Boolean(errors.passwordCurrent)}>
          <InputLabel htmlFor="current-password">
            {t("guestProfile.currentPasswordLabel")}
          </InputLabel>
          <OutlinedInput
            id="current-password"
            type={showPassword.current ? "text" : "password"}
            {...register("passwordCurrent", { required: true })}
            label={t("guestProfile.currentPasswordLabel")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleTogglePasswordVisibility("current")}
                  edge="end"
                >
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.passwordCurrent && (
            <FormHelperText error>{errors.passwordCurrent.message || t("guestProfile.passwordRequired")}</FormHelperText>
          )}
        </FormControl>

        {/* New Password Field */}
        <FormControl variant="outlined" error={Boolean(errors.password)}>
          <InputLabel htmlFor="new-password">{t("guestProfile.newPasswordLabel")}</InputLabel>
          <OutlinedInput
            id="new-password"
            type={showPassword.new ? "text" : "password"}
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: t("guestProfile.passwordMin"),
              },
              maxLength: {
                value: 20,
                message: t("guestProfile.passwordMax"),
              },
              validate: validatePassword,
            })}
            label={t("guestProfile.newPasswordLabel")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleTogglePasswordVisibility("new")}
                  edge="end"
                >
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {(errors.password && (
            <FormHelperText>{errors.password.message || t("guestProfile.passwordRequired") }</FormHelperText>
          ))}
        </FormControl>

        {/* Re-type Password Field */}
        <FormControl variant="outlined" error={Boolean(errors.passwordConfirm)}>
          <InputLabel htmlFor="retype-password">{t("guestProfile.retypePasswordLabel")}</InputLabel>
          <OutlinedInput
            id="retype-password"
            type={showPassword.retype ? "text" : "password"}
            {...register("passwordConfirm", {
              required: true,
              validate: (value) => {
                if (value !== watch("password")) {
                  return t("guestProfile.passwordRetypeNotMatch");
                }
              },
            })}
            label={t("guestProfile.retypePasswordLabel")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleTogglePasswordVisibility("retype")}
                  edge="end"
                >
                  {showPassword.retype ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.passwordConfirm && (
            <FormHelperText error>
              {errors.passwordConfirm.message || t("guestProfile.passwordRetypeRequired")}
            </FormHelperText>
          )}
        </FormControl>
        <Typography color="dark.300" fontSize="12px" marginTop={"10px"} textAlign={"left"}>
          {t("guestProfile.passwordDescription")}
        </Typography>
      </Stack>

      {/* Save Button */}
      <Box sx={{ width: "100%", boxSizing: "border-box" }}>
        <Stack
          sx={{ m: 2, justifyContent: "flex-end" }}
          direction="row"
          spacing={2}
        >
          <Button
            variant="contained"
            sx={{ px: 10, py: 2 }}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? t('guestProfile.saving') : t('guestProfile.saveButton')}
          </Button>
        </Stack>
      </Box>
    </>
  );
};
