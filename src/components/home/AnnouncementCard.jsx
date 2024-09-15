import { TfiAnnouncement } from "react-icons/tfi"

const AnnouncementCard = ({ announcement }) => {
	return (
		<div className='p-4 rounded-2xl'>
			<div className='flex justify-between items-center mt-4 gap-20'>
				<div className='flex gap-4 w-80'>
					<TfiAnnouncement className='text-[#2575ED]' size={26} />

					<div className='text-xl text-white w-60'>Announcement</div>
				</div>

				<div className='flex flex-col gap-4 items-center w-[476px]'>
					<p className='text-[#b9b9c8]'>Description</p>
					<p className='text-white w-[476px]'>{announcement?.description}</p>
				</div>

				<div className='flex flex-col gap-4 items-center'>
					<p className='text-[#b9b9c8]'>Title</p>
					<p className='text-white'>{announcement?.title}</p>
				</div>

				<div className='flex gap-4 items-center'>
					<div className='avatar'>
						<div className='w-16 rounded-full ring ring-[#b9b9c8] ring-offset-[#b9b9c8] ring-offset-2'>
							<img src={announcement?.image} />
						</div>
					</div>

					<p className='text-white mr-2'>By author</p>
				</div>
			</div>
		</div>
	)
}

export default AnnouncementCard
