import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFavEmail } from '../store/emailSlice'
import { TbLoaderQuarter } from "react-icons/tb";

const EmailBody = ({ }) => {

    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    // console.log(email);

    const email = useSelector(state => state?.email?.openedEmail)

    const getEmailBody = async () => {
        setLoading(true)
        const getBody = await axios.get(`https://flipkart-email-mock.now.sh/?id=${email.id}`)
        console.log(getBody);

        if (getBody.status == 200) {
            setBody(getBody.data.body)
            console.log(getBody.data.body);
            setLoading(false)
        }
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

        // return date.toLocaleString().split('T')[0]
    }


    const extractParagraph = (html) => {
        const paragraph = new DOMParser()
        const document = paragraph.parseFromString(html, "text/html")

        const paragraphs = Array.from(document.querySelectorAll("div > p"))

        const content = paragraphs.map((para) => para.textContent)
        return content
    }



    useEffect(() => {
        getEmailBody()
    }, [email])

    return (
        <>
            <section className='mt-20 mx-auto bg-white p-5  max-h-fit w-[68rem] mr-5'>
                <div className='  text-[#636363] '>
                    <header className='p-3 flex flex-row justify-between'>
                        <div className="left flex-row flex space-x-4">
                            <div className="img items-start">
                                <div className='w-16 h-16 relative rounded-full items-center flex justify-center bg-[#e54065]'>
                                    <span className=' font-semibold text-xl text-center text-white '>{email?.from.email.substring(0, 1).toUpperCase()}</span>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <p className='text-xl font-bold'>{email?.subject}</p>
                                <p>{FormatDate(email?.date)}</p>
                            </div>
                        </div>
                        <div className="right">
                            <button onClick={() => dispatch(setFavEmail(email))
                            } className='bg-[#e54065] text-white px-3 py-2 rounded-full text-sm'>
                                Mark as Favourite
                            </button>
                        </div>

                    </header>

                    <div className='p-10 -mt-7'>
                        {loading ? <TbLoaderQuarter className='w-fit mx-auto animate-spin' /> :
                            extractParagraph(body)}
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmailBody

// extractParagraph(body).map((p, key) => {
//     return <p className='mt-3' key={key}> {p}</p>
// })