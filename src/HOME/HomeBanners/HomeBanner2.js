import React from 'react'

const HomeBanner2 = () => {
    return (
      
        <div className='container'>
        <div className='row B_color1'>
        
         
        <div className=" col-md-3 text-center">
          <img
            className="align-self-center mr-3 B_img1 img-fluid"
            src="images/intervie2.png"
            alt="Generic placeholder image"
            style={{height:'150px',width:'auto'}}
            />
</div>
          <div className="B_media-body col-md-8">
            <h5 className="B_maintext">
            Get your profile to rank on top of recruiter searches
            </h5>
            <p className="B_text">Unleash your profile's true capability to 10X your chance</p>
          </div>
        
        <button
          className="bg-primary text-white btn-lg"
          style={{marginLeft:'auto', marginTop:"-46px", borderTopLeftRadius:"50px",border:'none'}}
        >
          Submit
        </button>
        
  
    
        </div>
    </div>
            
      
    )
}

export default HomeBanner2
