import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import EmailList from './components/EmailList'
import EmailBody from './components/EmailBody'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setCurrEmail } from './store/emailSlice'
import Editor from './components/Editor'

function App() {
  const [showBody, setShowBody] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [email, setEmail] = useState()
  const [favourite, setFavourite] = useState([])
  const [openEditor, setOpenEditor] = useState(false)

  const dispatch = useDispatch()

  const [selectedFilter, setSelectedFilter] = useState()

  const [readed, setReaded] = useState([])

  const getEmails = async () => {
    const response = await axios.get(`http://flipkart-email-mock.now.sh`)
    console.log(response);
    dispatch(setCurrEmail(response.data.list))
    setTotalPages(Math.ceil(response.data.total / 10))
  }

  const handlePageChange = (num) => {

    console.log(num);

    if (num >= 1 && num <= totalPages) {
      setPage(num)
    }
  }


  useEffect(() => {
    getEmails()
  }, [page])

  return (
    <>
      <Navbar setOpenEditor={setOpenEditor} setSelectedFilter={setSelectedFilter} setShowBody={setShowBody} />
      

      <section className={` ${showBody ? 'flex flex-row justify-around' : " "}`}>

        <EmailList  page={page} totalPages={totalPages} handlePageChange={handlePageChange} setEmail={setEmail} setShowBody={setShowBody} selectedFilter={selectedFilter} readed={readed} setReaded={setReaded} />

        {
          showBody ? <EmailBody favourite={favourite} setFavourite={setFavourite} email={email} /> : " "
        }

        {
          openEditor && <Editor />
        }

      </section>
    </>
  )
}

export default App
