import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '../store/hooks'
import { resetResult, setResult } from '../store/reducers/commonReducer'




const Home: NextPage = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const router = useRouter()
  const dispatch = useAppDispatch()
  //dispatch(resetResult())
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (data:FieldValues) => {
    console.log(data)
    try {
        const payload = new FormData()
        payload.append("number", data.number)
        if (data.email) {
          payload.append("email", data.email)
        }
        const res = await axios.post('http://localhost:8000/fibonacci/', payload)
        console.log(BigInt(res.data.result))
        dispatch(setResult(res.data.result))
        router.push("/answer")
    } catch (err) {
        console.log(err)
        enqueueSnackbar('Something went wrong.', { variant: "error" });
    }


    //router.push(`/${data.n}`)
  }


  return (
    <div className='container'>
      <h2>Are you looking for the website to get fibonacci? <br/>Well, you are in the right place</h2>

      <form className='formContainer' onSubmit={handleSubmit(onSubmit)}>
      <FormControl error={errors.number?true:false} fullWidth={true}>
      <TextField
          id="standard-number"
          label="N"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("number", { min: 0, required: true })}
          variant="standard"
        />
        <FormHelperText>{errors.number?"Invalid Input":""}</FormHelperText>
        </FormControl>

        <FormControl error={errors.email?true:false} fullWidth={true}>
      <TextField
          id="standard-number"
          label="Email"
          {...register("email", {required: false,
            pattern: {
              value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
              message: "Invalid Email"
            } })}
          variant="standard"
        />
        <FormHelperText>If your number is huge, please tell me your email. I am going to send the result to you</FormHelperText>
        <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>
      <Button variant="contained" type="submit">Calculate</Button>
      </form>
    </div>
  )
}

export default Home
