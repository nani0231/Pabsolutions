import React from 'react'
import { Link } from 'react-router-dom'

const HomeBanners = () => {
  return (



    <div className='container'>
      <div className='row B_color1'>


        <div className=" col-md-3 text-center">
          <img
            className="align-self-center mr-3 B_img1 img-fluid"
            src="images/intervie.png"
            alt="Generic placeholder image"
            style={{ height: '150px', width: 'auto' }}
          />
        </div>
        <div className="B_media-body col-md-8">
          <h5 className="B_maintext">
            What it feels like to have 48% more interview calls?
          </h5>
          <p className="B_text">To get 5x more recruiter views on your profile</p>
        </div>
<div className="text-right">     
     <Link to="/careers"  style={{ marginLeft: 'auto', marginTop: "-46px"}}> <button
          className="bg-primary text-white btn-lg"
          style={{  borderTopLeftRadius: "50px", border: 'none',cursor:"pointer"  }}
        >
          Click Here
        </button></Link>
        </div>




      </div>
    </div>


  )
}

export default HomeBanners
