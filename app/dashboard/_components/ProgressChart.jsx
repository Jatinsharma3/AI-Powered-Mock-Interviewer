"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

function ProgressChart() {
  const { user } = useUser()
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (user) fetchProgress()
  }, [user])

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/progress")
      const data = await res.json()
      setChartData(data)
    } catch (err) {
      console.error("Error fetching progress:", err)
    }
  }

  if (chartData.length < 2) {
    return (
      <div className='p-5 border rounded-lg bg-gray-50 flex flex-col items-center justify-center gap-2 h-64 mt-5'>
        <h3 className='font-semibold text-gray-500'>Not enough data yet</h3>
        <p className='text-sm text-gray-400'>
          Complete at least 2 interviews to see your progress chart.
        </p>
      </div>
    )
  }

  return (
    <div className='p-5 border rounded-lg bg-white shadow-sm mt-5'>
      <h2 className='font-bold text-lg mb-4 text-purple-600'>
        Your Interview Progress Over Time
      </h2>

      <div className='h-72 w-full'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="rating" stroke="#8B5CF6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProgressChart