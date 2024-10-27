export default function AdminFeedback(){
    const sampleData = [
        {
            "feedbackId": "fb-1001",
            "bookingId": "bk-2001",
            "email": "customer1@example.com",
            "rating": 5,
            "comment": "Excellent service and great experience!",
            "approved": false,
            "timeStamp": "2024-10-27T10:56:00Z"
        },
        {
            "feedbackId": "fb-1002",
            "bookingId": "bk-2002",
            "email": "customer2@example.com",
            "rating": 3,
            "comment": "Room was clean but food quality could be better.",
            "approved": false,
            "timeStamp": "2024-10-27T10:56:00Z"
        },
        {
            "feedbackId": "fb-1003",
            "bookingId": "bk-2003",
            "email": "customer3@example.com",
            "rating": 4,
            "comment": "Good location but service was a bit slow.",
            "approved": false,
            "timeStamp": "2024-10-27T10:56:00Z"
        }
            
    ];
    return(
        <div className="p-4 w-full">
            <table className="w-full bg-white border border-gray-400 text-left">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border border-gray-300">Email</th>
                        <th className="p-2 border border-gray-300">Rating</th>
                        <th className="p-2 border border-gray-300">Comment</th>
                        <th className="p-2 border border-gray-300">Date</th>
                        <th className="p-2 border border-gray-300">Approved/Rejected</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleData.map((feedback)=>{
                        return(
                            <tr key={feedback.feedbackId} className="hover:bg-gray-100">
                                <td className="p-2 border border-gray-300">{feedback.email}</td>
                                <td className="p-2 border border-gray-300">{feedback.rating}</td>
                                <td className="p-2 border border-gray-300">{feedback.comment}</td>
                                <td className="p-2 border border-gray-300">{feedback.timeStamp}</td>
                                <td className="p-2 border border-gray-300 ">{
                                    <div className="flex space-x-4">
                                        <button className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 w-20 ">Approve</button>
                                        <button className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-20 ">Reject</button>
                                    </div>
                                    }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}