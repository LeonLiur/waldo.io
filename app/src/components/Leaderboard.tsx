import React from 'react'

function Leaderboard({ leaderboard }: { leaderboard: leaderboardEntry[] }) {
    return (
        <div className='w-10/12 mx-auto'>
            <table className='table-fixed w-full'>
                <thead>
                    <tr>
                        <th className='px-2 w-1/6 border'></th>
                        <th className='px-4 w-5/12 border'>Name</th>
                        <th className='px-4 w-5/12 border'>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry: leaderboardEntry, index: number) => {
                        return (
                            <tr key={index}>
                                <td className='px-2 w-1/6 border'>{index + 1}</td>
                                <td className='px-4 w-5/12 border'>{entry.name}</td>
                                <td className='px-4 w-5/12 border'>{entry.score}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>

    )
}

type leaderboardEntry = {
    name: string, score: number
}

export default Leaderboard