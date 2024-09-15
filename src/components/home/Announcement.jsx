import AnnouncementCard from "./AnnouncementCard"

const Announcement = ({ announcements }) => {
	return (
		<div className='flex flex-col bg-[#313046] rounded-2xl overflow-x-auto p-10 mb-12'>
			<h2 className='text-2xl sm:text-4xl text-white font-bold self-center'>Announcements</h2>
			<div className='w-full flex flex-col gap-4 mt-4'>
				{announcements.map((announcement, index) => (
					<AnnouncementCard key={index} announcement={announcement} />
				))}
			</div>
		</div>
	)
}

export default Announcement
