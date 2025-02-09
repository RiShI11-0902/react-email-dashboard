import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EmailList from '../components/EmailList'
import EmailBody from '../components/EmailBody'

const EmailListPage = ({selectedFilter}) => {

    const [showBody, setShowBody] = useState(false)

        const currMails = useSelector(state => state.email.currEmailList)
        const readedEmails = useSelector(state => state.email.readedEmail)
        const favEmails = useSelector(state => state.email.favEmail)

        const getFilteredEmails = () => {
            if (selectedFilter === "read") {
              return readedEmails
            } else if (selectedFilter === "unread") {
              return currMails?.filter((email) => 
                !readedEmails.some((read) => read.id === email.id )
              );
            } else if (selectedFilter === "fav") {
              return favEmails
            } 
            return currMails; // Default case: no filter applied
          };

        // useEffect(() => {
        //     getFilteredEmails()
        // }, [selectedFilter])
        

    return (
        <section className={` ${showBody ? 'flex flex-row justify-around' : " "}`}>

            <EmailList mails={getFilteredEmails()} />

            {
                showBody ? <EmailBody favourite={favourite} setFavourite={setFavourite} email={email} /> : " "
            }

        </section>
    )
}

export default EmailListPage