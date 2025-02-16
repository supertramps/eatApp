import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  IconButton,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  TextField,
  Theme,
  Typography,
  Link
} from "@material-ui/core";
import React, { useState } from "react";
import { User } from "../../types/types";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

interface Iprops {
  userDataCallback(user: User): void;
}

function CreateUserForm(props: Iprops) {
  const classes = useStyles();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [matching, setMatching] = useState(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password1, setPassword1] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox' } };
  const [check, setCheck] = useState<boolean>(false)

  const [userToCreate, setUserToCreate] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    password: "",
    role: "customer",
  });

  const handlePasswordInput = (id: string, value: string) => {
    if (id === "password1") {
      if (value.length >= 6) {
        setPassword1(value);
        setPasswordTooShort(false);
      } else {
        setPasswordTooShort(true);
      }
    } else {
      setPassword2(value);
    }
  };

  function updateUserObject(id: string, value: string) {
    setUserToCreate({
      ...userToCreate,
      [id]: value,
    });
  }

  

  function handleChange(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    if (event.target.id === "password1" || event.target.id === "password2") {
      if (event.target.id === "password1") {
        updateUserObject("password", event.target.value);
        handlePasswordInput(event.target.id, event.target.value);
      } else {
        handlePasswordInput(event.target.id, event.target.value);
      }
    } else {
      updateUserObject(event.target.id, event.target.value);
    }
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (password1 && password1 === password2) {
      props.userDataCallback(userToCreate);
    } else {
      setMatching(false);
    }
  }

  function passwordValidation(
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) {
    setConfirmPassword(event.target.value);
    if (confirmPassword === userToCreate.password) {
    }
  }

  const handleCheckBoxChange = (event: any) => {
    setCheck(event.target.checked)
  }

  return (
    <Box>
      <form className={classes.formStyling} onSubmit={handleSubmit}>
        <TextField
          className={classes.inputField}
          required
          id="email"
          label="Epostadress"
          type="email"
          autoComplete="current-email"
          onBlur={handleChange}
          variant="outlined"
        />
        <TextField
          className={classes.inputField}
          required
          id="firstName"
          label="Förnamn"
          variant="outlined"
          type="name"
          autoComplete="current-email"
          onBlur={handleChange}
        />
        <TextField
          className={classes.inputField}
          required
          id="lastName"
          label="Efternamn"
          variant="outlined"
          type="name"
          autoComplete="current-email"
          onBlur={handleChange}
        />
        <TextField
          required
          className={classes.inputField}
          id="phoneNumber"
          label="Telefonnummer"
          variant="outlined"
          type="phone"
          autoComplete="current-email"
          onBlur={handleChange}
        />
        <OutlinedInput
          className={classes.inputField}
          id="password1"
          placeholder="Lösenord"
          required
          error={passwordTooShort}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        <OutlinedInput
          className={classes.inputField}
          required
          id="password2"
          placeholder="Lösenord"
          onChange={handleChange}
          error={!matching}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Box style={{
          display: "flex",
          alignItems: "center"
        }}>
          <Checkbox 
            {...label} 
            color="default" 
            onChange={handleCheckBoxChange}
          />
          <Typography
            style={{
              fontSize: "0.7rem"
            }}
          >Jag accepterar <Link href="https://www.freeprivacypolicy.com/live/775830bf-3092-4d01-900e-7a355410fc7a">villkoren</Link> för GDPR</Typography>
        </Box>
        <FormHelperText id="password2">
          {!matching ? "Lösenorden matchar inte." : ""}
          {passwordTooShort
            ? "Lösenordet måste vara längre än 6 karaktärer."
            : ""}
        </FormHelperText>

        <Box className={classes.submitBtnStyling}>
          <Button
            disabled={!check}
            className={classes.buttonStyling}
            variant="contained"
            endIcon={<AddIcon />}
            type="submit"
          >
            Skapa användare
          </Button>
        </Box>
      </form>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  formStyling: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    width: "15rem",
    margin: ".5rem 0",
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  submitBtnStyling: {
    marginTop: ".2rem",
  },
  buttonStyling: {
    display: "flex",
    alignItems: "center",
    height: "2rem",
    padding: "0 .5rem",
    textTransform: "none",
  },
}));

export default CreateUserForm;
