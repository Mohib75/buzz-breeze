import Button from "../../Button"

const ReportDataRow = ({ report }) => {
	const truncateComment = (comment) => {
		if (!comment) return ""

		const fixedWord = comment.slice(0, 10)
		const finalWord = fixedWord + "..."
		return comment.length >= 10 ? finalWord : comment
	}

	return (
		<tr>
			<td className='px-5 py-5 border-b border-gray-200 bg-[#313046] text-sm'>
				<div className='flex items-center'>
					<div className=''>
						<p className='text-[#b9b9c8] whitespace-no-wrap'>{report?.email}</p>
					</div>
				</div>
			</td>

			<td className='px-5 py-5 border-b border-gray-200 bg-[#313046] text-sm'>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0 flex items-center gap-2'>
						<p className='text-[#b9b9c8] whitespace-no-wrap'>
							{truncateComment(report?.comment)}
							<br className='sm:hidden' />
							<Button onClick={() => document.getElementById("my_modal_5").showModal()} className='text-[#2575ED]'>
								Read More
							</Button>
						</p>
					</div>
				</div>

				<dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
					<div className='modal-box'>
						<h3 className='font-bold text-lg'>Comment</h3>
						<p className='py-4'>{report?.comment}</p>
						<div className='modal-action'>
							<form method='dialog'>
								{/* if there is a button in form, it will close the modal */}
								<button className='btn'>Close</button>
							</form>
						</div>
					</div>
				</dialog>
			</td>

			<td className='py-5 border-b border-gray-200 bg-[#313046] text-sm '>
				<div className='ml-3 mr-3 flex items-center gap-2'>
					<p className='text-[#b9b9c8] whitespace-no-wrap'>{report?.feedback}</p>
				</div>
			</td>
		</tr>
	)
}

export default ReportDataRow
