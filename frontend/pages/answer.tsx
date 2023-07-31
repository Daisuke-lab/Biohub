import axios from "axios";
import { NextPage } from "next";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useAppSelector } from "../store/hooks";
import { useRouter } from "next/router";

const AnswerPage: NextPage = () => {
    const router = useRouter()
    const result = useAppSelector(state => state.commons.result)
    if (result === null) {
        router.push("/")
    }
    

    return (
        <div className='container'>
            {result === 0?<h3>Email will be sent after calculation.</h3>:
            <h3>The answer is {BigInt(result as number).toString()}</h3>}
        </div>
    )
}


export default AnswerPage
