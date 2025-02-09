import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenedEmail, setReadedEmail } from '../store/emailSlice';

const EmailBox = ({ email, setShowBody, setActiveEmail, activeEmail }) => {

    const readedEmails = useSelector(state => state.email.readedEmail)
    // const openedEmail = useSelector(state => state.email.openedEmail)
    const favEmails = useSelector(state => state.email.favEmail)


    // console.log(email);
    


    const dispatch = useDispatch()

    const selectEmail = (id) => {
        // localStorage.setItem("readed", JSON.stringify(email))
        dispatch(setOpenedEmail(email))
        setShowBody(true)
        dispatch(setReadedEmail(email))
        setActiveEmail(id)
    }

    const FormatDate = (rawDate) => {
        const newDate = new Date(rawDate)
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }

        const formattedDate = newDate.toLocaleString('en-GB', options);

        return formattedDate

        // const date = new Date(rawDate)
        // return date.toLocaleString().split("T")[0]
    }

    useEffect(() => {
    }, [favEmails])
    // ${readedEmails.some((readEmail) => readEmail._id === email._id) ? 'bg-[#f2f2f2]' : 'bg-white'} 
    // ${openedEmail?._id === email._id ? 'border border-2 border-[#e54065]' : ''} 
    return (
        <>
            <div onClick={() => selectEmail(email.id)} className={`flex bg-[#f2f2f2]  flex-row w-full cursor-pointer  p-5 mt-5 items-center space-x-5 rounded-lg ${activeEmail === email.id ? 'border border-2 border-[#e54065]' : ''} `}>
                <div className="img items-start">
                    <div className='w-16 h-16 items-center flex justify-center  rounded-full bg-[#e54065]'>
                        <span className='font-semibold text-xl text-center text-white '>
                            {email.from.name.substring(0,1).toLocaleUpperCase()}
                        </span>
                    </div>
                </div>
                <section className='flex flex-col space-y-2 text-[#636363]'>
                    <span>From: <span className='font-bold'>{email.from.email} </span></span>
                    <p>Subject: <span className='font-semibold'>{email.subject}</span></p>
                    <p>{email.short_description}</p>

                    <p className='flex flex-row space-x-5'>
                        <span>{FormatDate(email?.date)} </span>
                        {
                            favEmails?.map((i) => {
                                return (i.id == email.id ? <span className='text-[#e54065] font-bold'>Favourite</span> : " ")
                            })
                        }
                    </p>
                </section>
            </div>
        </>
    )
}

export default EmailBox