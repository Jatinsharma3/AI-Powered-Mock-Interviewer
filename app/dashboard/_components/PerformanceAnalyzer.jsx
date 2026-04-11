"use client"

import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { LoaderCircle, Sparkles } from 'lucide-react'

function PerformanceAnalyzer() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState("")

  const generateReport = async () => {
    setLoading(true)
    setReport("")

    try {
      const res = await fetch("/api/performance-report", {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Failed")
      }

      setReport(data.report)

    } catch (error) {
      console.error(error)
      setReport("Failed to generate report. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-6 border rounded-xl bg-purple-50 mt-5'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='font-bold text-lg text-purple-900 flex items-center gap-2'>
          <Sparkles className="text-purple-600" size={20} />
          AI Overall Feedback Analyzer
        </h2>

        {!report && (
          <button
            onClick={generateReport}
            disabled={loading}
            className='bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2'
          >
            {loading && <LoaderCircle className='animate-spin' size={16} />}
            {loading ? 'Analyzing...' : 'Generate Report'}
          </button>
        )}
      </div>

      {report ? (
        <div className='text-gray-700 text-sm whitespace-pre-wrap leading-relaxed'>
          {report}
        </div>
      ) : (
        <p className='text-sm text-gray-500'>
          Click the button above to generate a personalized AI summary.
        </p>
      )}
    </div>
  )
}

export default PerformanceAnalyzer