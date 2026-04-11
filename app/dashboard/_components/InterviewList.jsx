"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState([])

  useEffect(() => {
    if (user) fetchInterviews()
  }, [user])

  const fetchInterviews = async () => {
    try {
      const res = await fetch("/api/interviews")
      const data = await res.json()
      setInterviewList(data)
    } catch (err) {
      console.error("Error fetching interviews:", err)
    }
  }

  return (
    <div>
      <h2 className='font-medium text-xl'>Previous Mock Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {interviewList.map((interview, index) => (
          <InterviewItemCard
            interview={interview}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default InterviewList