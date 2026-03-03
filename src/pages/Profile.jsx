
import { authContext } from '../contexts/authContext';
import profileImg from '/src/assets/route.jpg'
import { useContext, useState } from 'react';
import { addToast } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { apiServices } from './../services/api';

export default function Profile() {

  const {UserData, setUserData} = useContext(authContext);
   const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
      const navigate =useNavigate()
    console.log(UserData);
    
  const handleImageChange =(e)=>{
    if(e.target.files[0]){
      setSelectedFile(e.target.files[0])
      setShowModal(true);
      const imgSrc=URL.createObjectURL(e.target.files[0])
      setPreview(imgSrc)
    }

  }
  function removeImage(){
    setPreview(null)
    document.getElementById("imageInput").value=null
  }
  
  async function uploadProfileImage() {
    const formData = new FormData();
    formData.set("photo",selectedFile)
      const data= await apiServices.uploadProfileImage(formData)
      console.log(data);
      
      
      addToast({
          title: "Success",
          description: "Profile Photo Updated Successfully",
          color:"success",
      })
      navigate("/")
      
      setUserData({...UserData,
            photo:data.data.photo})
          }
  return (
    <main className="profile-page ">
      <section className="relative block mt-5 p-5">
        {/* <div className="group/cover overflow-hidden rounded-t-2xl relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          />
        </div> */}
        <div className="group/cover overflow-hidden rounded-t-2xl  relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]" />
          <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/8 blur-3xl" />
          <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/25 to-transparent" />
          <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">
            {/* <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={13}
                height={13}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-camera"
                aria-hidden="true"
              >
                <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
                <circle cx={12} cy={13} r={3} />
              </svg>
              Add cover
              <input accept="image/*" className="hidden" type="file" />
            </label> */}
          </div>
        </div>
      </section>
      <section className="relative py-35 bg-blueGray-200">
        <div className="container mx-auto px-10">
          <div className="relative flex flex-col min-w-0 wrap-break-word bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              
              <div className="px-8 py-10">

              <div className="flex flex-col lg:flex-row justify-between gap-10">

                <div className="flex items-center gap-6">

                  <div className="relative group w-32 h-32 shrink-0">
                    <img
                      src={UserData?.photo}
                      alt="profile"
                      className="w-32 h-32 rounded-full object-cover shadow-lg"
                    />

                    <label htmlFor='imageInput' className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-7 h-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M3 7h4l2-3h6l2 3h4v12H3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                      <input type="file" accept="image/*" id="imageInput" className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{UserData?.name}</h3>
                    <h3 className='text-gray-500'>@</h3>
                    <p className="text-gray-500 text-sm">Route Posts member</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 justify-center lg:justify-start">

  <div className="flex flex-col justify-center items-center bg-gray-50 px-6 py-4 rounded-xl shadow-sm w-full sm:w-40 h-32">
    <h4 className="text-sm text-gray-500">Followers</h4>
    <p className="text-xl font-bold">{UserData?.followersCount}</p>
  </div>

  <div className="flex flex-col justify-center items-center bg-gray-50 px-6 py-4 rounded-xl shadow-sm w-full sm:w-40 h-32">
    <h4 className="text-sm text-gray-500">Following</h4>
    <p className="text-xl font-bold">{UserData?.followingCount}</p>
  </div>

  <div className="flex flex-col justify-center items-center bg-gray-50 px-6 py-4 rounded-xl shadow-sm w-full sm:w-40 h-32">
    <h4 className="text-sm text-gray-500">Bookmarks</h4>
    <p className="text-xl font-bold">{UserData?.bookmarksCount}</p>
  </div>

</div>
              </div>


              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

                <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-gray-700 mb-3">About</h3>
                  <h4 className="text-gray-600 text-sm">
                    {UserData?.email}
                  </h4>
                  <p className="text-gray-400 text-xs mt-2">
                    Active on Route Posts
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
  
                  <div className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col justify-center items-center">
                    <h4 className="text-sm text-gray-500">My posts</h4>
                    <p className="text-2xl font-bold">0</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col justify-center items-center">
                    <h4 className="text-sm text-gray-500">Saved posts</h4>
                    <p className="text-2xl font-bold">0</p>
                  </div>

                </div>

              </div>

            </div>

              
            </div>
          </div>
        </div>
      </section>

      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">

      <h3 className="text-lg font-semibold mb-4">
        Confirm Image
      </h3>

      <img
        src={preview}
        alt="preview"
        className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
      />

      <p className="text-sm text-gray-500 mb-6">
        Do you want to use this image?
      </p>

      <div className="flex justify-center gap-4">

        {/* Confirm */}
        <button
          onClick={() => {
            uploadProfileImage();
            setShowModal(false);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Confirm
        </button>

        {/* Cancel */}
        <button
          onClick={() => {
            setPreview(null);
            setSelectedFile(null);
            setShowModal(false);
            removeImage()

          }}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Cancel
        </button>

      </div>
    </div>
  </div>
)}
    </main>
  );
}
