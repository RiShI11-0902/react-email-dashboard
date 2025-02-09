import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EmailBox from './EmailBox'
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';


const EmailList = ({ page, totalPages, handlePageChange, setEmail, setShowBody, selectedFilter, readed }) => {


    const currEmails = useSelector(state => state.email.currEmailList)
    const readedEmails = useSelector(state => state.email.readedEmail)
    const favEmails = useSelector(state => state.email.favEmail)
    const category = useSelector(state => state.email.selectedCategory)

    const [activeEmail, setActiveEmail] = useState(null)

    // console.log(readed);


    const getFilteredEmails = () => {
        switch (category) {
            case 'all':
                return currEmails
            case 'read':
                return readedEmails
            case 'unread':
                return currEmails?.filter((email) =>
                    !readedEmails.some((read) => read.id === email.id && read.id != activeEmail)
                );
            case 'fav':
                return favEmails
            default:
                break;
        }
        // if (selectedFilter === "read") {
        //   return readedEmails
        // } else if (selectedFilter === "unread") {
        //   return currEmails?.filter((email) => 
        //     !readedEmails.some((read) => read.id === email.id && read.id != activeEmail )
        //   );
        // } else if (selectedFilter === "fav") {
        //   return favEmails
        // }
        // return currEmails; // Default case: no filter applied
    };

    return (
        <>
            <div className='p-5 pt-16 mt-5 '>
                {
                    getFilteredEmails()?.map((i, key) => {
                        return <EmailBox key={key} setShowBody={setShowBody} email={i} setActiveEmail={setActiveEmail} activeEmail={activeEmail} />
                    })
                }

                {
                    getFilteredEmails()?.length > 0 && selectedFilter == 'all' ? <section className='p-3 mt-10'>
                        <div className='flex flex-row space-x-5 mx-auto w-fit'>
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                            >
                                <FaChevronCircleLeft />
                            </button>
                            <span>
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                            >
                                <FaChevronCircleRight />
                            </button>
                        </div>
                    </section > : ""
                }

                {
                    getFilteredEmails()?.length == 0 && selectedFilter != 'all' ? <p className='mx-auto w-fit mt-10 font-extrabold text-2xl'>No Emails</p> : ""
                }


            </div >
        </>
    )
}

export default EmailList