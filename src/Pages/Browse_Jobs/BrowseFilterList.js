import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import apiList, { server } from '../../lib/apiList';
import ReactPaginate from 'react-paginate';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import moment from 'moment';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import TopCompaniesFilter from './filters/TopCompaniesFilter';
import ExperienceFilter from './filters/ExperienceFilter';
import LocationFilter from './filters/LocationFilter';
import IndustryFilter from './filters/IndustryFilter';
import JobCategoryFilter from './filters/DesignationFilter';
import EducationFilter from './filters/EducationFilter';
import SalaryFilter from './filters/SalaryFilter';
import ReactTimeAgo from 'react-time-ago'
import DesignationFilter from './filters/DesignationFilter';
import { useSelector } from 'react-redux';
import { Autocomplete } from '@mui/material';
import { TextField } from '@material-ui/core';
// import skillsdata from '../JsonData/Skill.json';
import skillsdata from '../../JsonData/Skill.json'
import data from '../../JsonData/locations.json'
import Browsead from '../../ads/Browsead'

// import data from '../JsonData/locations.json'

const BrowseFilterList = () => {

  const [post, setPost] = useState({
      
    skillsets:[],
    cities:[],
   
})

  const result = useSelector(state=>state.data)
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  console.log('qqqq ', query.get('keyword'));
  let paramKeyword = ''
  let paramQLocation = ''
  let paramTopCompanies = []
  let paramIndustryType = []
  let paramLocation = []
  let paramDesignation = []

  paramKeyword = query.get('keyword');
  paramQLocation = query.get('qlocation');

  if (query.get('company')) {
    paramTopCompanies.push(query.get('company'))
  }

  if (query.get('category')) {
    paramIndustryType.push(query.get('category'))
  }

  if (query.get('locate')) {
    paramLocation.push(query.get('locate'))
  }

  if (query.get('designate')) {
    paramDesignation.push(query.get('designate'))
  }


  const [keyword, setKeyword] = useState(paramKeyword)
  const [qlocation, setQLocation] = useState(paramQLocation)

  const [jobs, setJobs] = useState([])
  const [topCompanies, setTopCompanies] = useState(paramTopCompanies)
  const [experience, setExperience] = useState([])
  const [location, setLocation] = useState(paramLocation)
  const [industryType, setIndustryType] = useState(paramIndustryType)
  const [education, setEducation] = useState([])
  const [designation, setDesignation] = useState(paramDesignation)
  const [salary, setSalary] = useState()
  const [listType, setListType] = useState('list')
  const [isLoading, setLoading] = useState(false)
  const [onHold, setOnHold] = useState(false)
  const [keywordError, setKeywordError] = useState("");
  const [locationError, setLocationError] = useState("");

  const list = [1, 2, 3, 4, 5, 6];




  // Pagination code
  const [offset, setOffset] = useState(1);
  //   const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(30);
  const [pageCount, setPageCount] = useState(0);
  // const indexOfLastPost = offset * perPage;
  // const indexOfFirstPost = indexOfLastPost - perPage;
  // const currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
    console.log('selectedPage', selectedPage);
    fetchJobs(selectedPage)
    window.scrollTo({
      top: 450,
      behavior: 'smooth',
    })
  };

  const handleTopCompaniesAdd = async (companies) => {
    setTopCompanies(companies)
    fetchJobs();

  }

  const handleTopCompaniesRemove = async (companies) => {
    setTopCompanies(companies)
    // fetchJobs();

  }

  const handleLocationAdd = async (locations) => {
    setLocation(locations)
    fetchJobs();

  }

  const handleLocationRemove = async (locations) => {
    setLocation(locations)
    // fetchJobs();

  }

  const handleIndustryTypeAdd = async (industry) => {
    setIndustryType(industry)
    fetchJobs();

  }

  const handleIndustryTypeRemove = async (industry) => {
    setIndustryType(industry)
    // fetchJobs();

  }

  const handleDesignationAdd = async (designate) => {
    setDesignation(designate)
    fetchJobs();

  }

  const handleDesignationRemove = async (designate) => {
    setDesignation(designate)
    // fetchJobs();

  }

  const handleEducationAdd = async (educations) => {
    setEducation(educations)
    fetchJobs();

  }

  const handleEducationRemove = async (educations) => {
    setEducation(educations)
    // fetchJobs();

  }

  const resetFilter = () => {
    setTopCompanies([])
    setExperience([])
    setLocation([])
    setEducation([])
    setSalary()
    setKeyword("")
    setQLocation("")
  }

  const handleAddWishlist = async (id) => {
    
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    console.log('hhhh', headers);
    if (onHold) {
      return
    }
    setOnHold(true)
    await axios.get(apiList.wishlist + 'add/' + id, {
      headers
    })
      .then((response) => {
        let jobList = jobs;
        jobList = jobList.map(jobItem => {
          if (jobItem._id == id) {
            jobItem.wishlist = true
          }
          return jobItem;
        })
        setJobs(jobList);
        toast.success("Added to Wishlist!")
        setOnHold(false)
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message)
      });
  }

  const handleRemoveWishlist = async (id) => {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    console.log('hhhh', headers);
    if (onHold) {
      return
    }
    setOnHold(true)
    await axios.get(apiList.wishlist + 'remove/' + id, {
      headers,
    })
      .then((response) => {
        let jobList = jobs;
        jobList = jobList.map(jobItem => {
          if (jobItem._id == id) {
            jobItem.wishlist = false
          }
          return jobItem;
        })
        setJobs(jobList);
        toast.success("Removed from Wishlist!")
        setOnHold(false)
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message)
      });
  }

  const fetchJobs = async (page = 0) => {
    setJobs([])
    setLoading(true)
    console.log('topCompaniesssss', topCompanies);
    let token = localStorage.getItem("token");
    let headers = {}
    if (token) {
      headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }
    let data = {
      location,
      experience,
      companies: topCompanies,
      educations: education,
      category: designation,
      industryType
      // salaryMin: 0,
      // salaryMax: 18000
    }
    if (salary) {
      data.salaryMin = salary.salaryMin
      data.salaryMax = salary.salaryMax
    }
    if (keyword !== '') {
      data.q = keyword
    }
    if (qlocation !== '') {
      data.qlocation = qlocation
    }
    await axios.post(apiList.jobSearch + '?page=' + page, data, {
      headers,
    })
      .then((response) => {
        setPageCount(Math.ceil(response.data.counts) / 20)
        console.log('posts', response.data.posts);
        setJobs(response.data.posts)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message)
      });
  }

  const handleSearch = e => {
    let haveError = false
    if (keyword == '') {
      haveError = true
      setKeywordError('Keyword is required!')
    }
    if (qlocation == '') {
      haveError = true
      setLocationError('Location is required!')
    }
    if (haveError) {
      e.preventDefault()
    }
  }

  useEffect(async () => {

    fetchJobs();

  }, [topCompanies, experience, location, education, salary, industryType, designation])

  console.log('kkkkkkkk', keyword, qlocation);

  return (
    <div >
      <div className="job_detail_wrapper">
        <div className="heading_pic_filter_list">
          <h1 className="filter_list_heading_1">Browse Job List</h1>
          <p className="text-center filter_list_sub_heading">
            <Link to="/" className="filter_list_sub_heading_1">Home</Link>
            <i class='fas fa-greater-than text-white px-2'></i>
            <a href="#" className="filter_list_sub_heading_2 ">Browse Filter List</a></p>
        </div>
      </div>


      <div className="container" >
        <div className="filter_list_search-box ">
          <form className="form-control py-4" onSubmit={handleSearch} style={{boxShadow:"0 0 8px rgb(0 0 0 / 25%);"}}>
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="">
                  
                  <div className="">
                    {/* <input type="text" name="keyword" className="form-control" id="search_filter_list_input"
                      placeholder="Job Title, Keywords, or Phrase" value={keyword} onChange={(e) => {setKeyword(e.target.value); setKeywordError("")}}  /> */}

<div>
                                            {/* <label>Technical Skills :</label> */}
                                                  <Autocomplete
                                                    id="combo-box-demo"
                                                    multiple
                                                    value={post.skillsets}
                                                    options={skillsdata.map((res)=>{
                                                    return res.Skill
                                                    })}
                                                    getOptionLabel={(option) => option}
                                                    onChange={(e, value) => {
                                                    setPost({
                                                        ...post,
                                                        skillsets:value
                                                    });
                                                    }}
                                                    
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        name="multiple"
                                                        label="Job Title, Keywords, or Phrase"
                                                        variant="outlined"
                                                        fullWidth
                                                        name='keyword' value={keyword} onChange={(e) => { setKeyword(e.target.value)}}
                                                    />
                                                    )}
                                                />
                                                  {/* <span>Press enter to add skills</span> */}
                                                </div>
                    
                    {/* <div className="input-group-append">
                      <span className="filter_list_group_icon">
                        <i className="fas fa-search ml-2" id="filter_list_search_icon1"></i>
                      </span>
                    </div> */}
                  </div>
                  {/* {keywordError != '' && <small style={{color: 'red'}}>{keywordError}</small>} */}
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="">
                 
                  <div className="">
                    {/* <input type="text" className="form-control" name="qlocation" id="search_filter_list_input" value={qlocation} onChange={(e) => {setQLocation(e.target.value); setLocationError("")}}
                      placeholder="Location"  /> */}
                      

                      <Autocomplete
                                                    id="combo-box-demo"
                                                    multiple
                                                    value={post.cities}
                                                    options={data.map((res)=>{
                                                    return res.location
                                                
                                                    })}
                                                    getOptionLabel={(option) => option}
                                                    onChange={(e, value) => {
                                                    setPost({
                                                        ...post,
                                                        cities:value
                                                    });
                                                    }}
                                                    
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        name="multiple"
                                                        label="City ,Province or Region"
                                                        variant="outlined"
                                                        fullWidth
                                                        name='qlocation' value={qlocation} onChange={(e) => {setQLocation(e.target.value)}}
                                                    />
                                                    )}
                                                />
                                             

                    {/* <div className="input-group-append">
                      <span className="filter_list_group_icon">
                        <i className="fas fa-map-marker-alt" id="filter_list_search_icon2"></i></span>
                    </div> */}
                  </div>
                  {/* {locationError != '' && <small style={{color: 'red'}}>{locationError}</small>} */}
                </div>
              </div>

              <div className="col-lg-2 col-md-6 my-auto">
               
                <a href="#"></a><button id="filter_list_search_btn" className=" btn-block">Find
                  Job</button>
              </div>

            </div>
          </form>
        </div>

      </div>




      <div id="job_filter_list">
        <div className="container BFL">

          {/* <div className="d-flex mb-4" style={{width:'74.5%'}}>  
            <div className="view_list_grid ml-auto" >
              <button
                className={`btn list_view mb-2 ${listType === 'list' && 'browse_active'}`} onClick={() => setListType('list')}>List View</button>
              <button
                className={`btn list_view mb-2 ${listType === 'grid' && 'browse_active'}`} onClick={() => setListType('grid')}>Grid View</button>
              
            </div>
          </div> */}

          <div className="row ">

            <div className="col-lg-3">
              <div className="#">
                <div id="accordion">
                  <TopCompaniesFilter topCompanies={topCompanies} handleTopCompaniesAdd={handleTopCompaniesAdd} handleTopCompaniesRemove={handleTopCompaniesRemove} />

                  {/* 2 */}

                  <ExperienceFilter experience={experience} setExperience={setExperience} />

                  <LocationFilter location={location} handleLocationAdd={handleLocationAdd} handleLocationRemove={handleLocationRemove} />

                  {/* 4 */}

                  <IndustryFilter industryType={industryType} handleIndustryTypeAdd={handleIndustryTypeAdd} handleIndustryTypeRemove={handleIndustryTypeRemove} />

                  {/* 5 */}

                  <DesignationFilter designation={designation} handleDesignationAdd={handleDesignationAdd} handleDesignationRemove={handleDesignationRemove} />

                  {/* 6 */}

                  <EducationFilter education={education} handleEducationAdd={handleEducationAdd} handleEducationRemove={handleEducationRemove} />

                  {/* 7 */}

                  <SalaryFilter salary={salary} setSalary={setSalary} />
                </div>
              </div>


              <Browsead />

              <Browsead />

              <Browsead />

              <Browsead />

              <Browsead />
            </div>





            <div className="list_view_width col-lg-6">
              {listType === 'list' ?
                <>
                  {
                    jobs.length > 0 ?
                      jobs?.map((job) => {
                        return (
                         
                          <ul className="filter_list_job_post ">
                            <li>
                            <Link to={`/jobdetailes/${job._id}`}>
                              <div className="filter_list_job_box filter_list_main">
                                <div className="d-flex mb-4">

                                  <div className="filter_list_job_company">
                                    {/* <span><img alt="" src={job.recruiter?.profileImage? `${server}/public/profile/${job.recruiter.profileImage}`: " " }/></span> */}
                                    <img src={job.recruiter?.profileImage? job.recruiter.profileImage:" " } alt=""/>
                                  </div>

                                  <div className="filter_list_job_info">
                                    <h4>{job.title}</h4>
                                    <h5 className="home_company_name">{job.recruiter?.companyname}</h5>
                                    <ul>
                                    
                                      
                                    
                                      <li><i className="fas fa-map-marker-alt"></i>
                                      {job.cities.map((job,index,arr)=>{
                                        return (<>
                                          {job}{index!=(arr.length-1)?"/":""}
                                          </>)
                                      })}
                                      </li>
                                      <li><i className="far fa-bookmark"></i>{job.jobType}</li>
                                      <li><i className="far fa-clock"></i>Published {" "}
                                        {/* <ReactTimeAgo date={job.dateOfPosting} locale="en-US" /> */}
                                        {/* {moment(job.postedAt).fromNow()} */}
                                        {moment(job.postedAt? Number(job.postedAt) : job.dateOfPosting ).fromNow()}
                                      </li>
{/* 1646973039978 */}
                                    </ul>
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div className="filter_list_job_type mr-auto">
                                    <a href="#"><span>Full Time</span></a>
                                  </div>
                                  <div className="filter_list_salary">
                                    <span><i className="fas fa-rupee-sign"></i> {job.salary} 
                                      </span>
                                  </div>
                                </div>
                                <label className="wishlist">
                                {result?.type==="applicant" ? 
                                <button className='btn job_details_applybtn filter_list_wishlist' > Apply </button>: 
                                result?.type==="recruiter"? null :  
                                <Link to="/auth" > <button className='btn job_details_applybtn filter_list_wishlist'> Login to Apply </button>  </Link>} 
                                </label>
                                
                              </div>
                              </Link>

                                {/* saved jobs icon */}

                                {result?.type==="applicant" ? 
                                <>
                                {job.wishlist ? (
                                <label className="job_filter_grid_wishlist" onClick={() => handleRemoveWishlist(job._id)}  style={{ position: 'absolute', right: 105, top: 31 }}>
                                  {/* <input type="checkbox" /> */}
                                  <span className="filter_grid_added" >

                                    <i class="fab fa-gratipay" style={{fontSize:'28px'}}/>
                                  </span>
                                </label>
                              ) : (
                                <label className="job_filter_grid_wishlist" onClick={() => handleAddWishlist(job._id)}  style={{ position: 'absolute', right: 105, top: 35}}>
                                  {/* <input type="checkbox" /> */}
                                  <span className="filter_grid_added" >
                                    <i className="fas fa-heart" />
                                  </span>
                                </label>
                              )}
                              </>
                              :null}

                            </li>
                          </ul>
                         
                        )
                      }) :
                      <>
                        {isLoading ?
                          <div className="skeleton">
                          {list.map((item)=>{
                            return(
                          <div className="contact__item mb-5" key={item}>
                            <ul className="job-post">
                          <li >
                            <SkeletonTheme color="#f3f3f3" highlightColor="#ecebeb">
                              <div style={{ display: "flex", width: "100%" }}>
                                <Skeleton circle={false} height={50} width={50} />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%"
                                  }}
                                >
                                  <Skeleton
                                    height={12}
                                    width="30%"
                                    style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}
                                  />
                                  <Skeleton
                                    height={8}
                                    width="40%"
                                    style={{ marginLeft: "1rem" }}
                                  />
                                  <Skeleton
                                    height={8}
                                    width="50%"
                                    style={{ marginLeft: "1rem", marginTop: 0 }}
                                  />
                                  <Skeleton
                                    height={12}
                                    width="80%"
                                    style={{ marginLeft: "1rem", marginTop: "0.6rem" }}
                                  />
                                </div>
                              </div>
                            </SkeletonTheme>
                            </li>
                          </ul>
                          </div>
                            )
                          })}
                          </div>
                          :
                          <div style={{ textAlign: "-webkit-center" }}>
                            <p>There is no jobs to list with the current filter</p>
                            <button
                              className={`btn list_view mb-2 `} onClick={resetFilter}>Reset Filter</button>
                          </div>
                        }

                      </>

                      
                      // <div style={{ textAlign: "-webkit-center" }}>
                      //   <ReactLoading type="balls" color={"rgb(118 55 117)"} height={500} width={150} />
                      // </div>
                  }
                </>
                :
                <div class="row" id='job_filter_grid'>
                  {
                    jobs.length > 0 ?
                      jobs?.map((job) => {
                        return (<>
                          <div className="col-lg-6 col-sm-12">
                             <Link to={`/jobdetailes/${job._id}`}>
                            <div className="job_filter_grid_box position-relative">
                              <div className="d-flex mb-4">
                                <div className="job_filter_grid_info">
                                  <div className="job_heading ">
                                  <h5>
                                    {/* <Link to={`/jobdetailes/${job._id}`}>{job.title}</Link> */}
                                 {job.title}
                                  </h5>
                               </div>
                                  <div className="apply_grid_box">
                                  <label className="wishlist ">
                                {result?.type==="applicant" ? 
                                <button className='btn job_details_applybtn_grid apply_job_grid_new' > Apply</button>: 
                                result?.type==="recruiter"? null :  
                                <Link to="/auth" ><div className="login_apply"> <button className='btn job_details_applybtn_grid '> Login to Apply </button> </div> </Link>} 
                                </label>
                                    </div>
                                  <div className="job_filter_grid_in_up">
                                    <i className="fas fa-map-marker-alt"/>
                                    <span> Hyderabad</span>
                                    <i className="far fa-bookmark" />
                                    <span> {job.jobType}</span>
                                    <div className="job_filter_grid_in_down">
                                      <i className="far fa-clock" /> <span> Published <ReactTimeAgo date={job.dateOfPosting} locale="en-US" /></span>
                                    </div>
                                  </div>
                                  <p />
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="job_filter_grid_type mr-auto mb-3">
                                  <span>Full Time</span>
                                </div>
                                <div className="job_filter_grid_salary">
                                  <span>
                                    <i className="fas fa-rupee-sign" /> {job.salary} 
                                    {/* -
                                    <i className="fas fa-rupee-sign" /> 25000 */}
                                  </span>
                                </div>
                              </div>
                              
                              
                              {/* {job.wishlist ? (
                                <label className="job_filter_grid_wishlist" onClick={() => handleRemoveWishlist(job._id)}>
                                  <input type="checkbox" />
                                  <span className="filter_grid_added" >

                                    <i class="fab fa-gratipay" style={{ position: 'absolute', left: 6, top: 6 }} />
                                  </span>
                                </label>
                              ) : (
                                <label className="job_filter_grid_wishlist" onClick={() => handleAddWishlist(job._id)}>
                                  <input type="checkbox" />
                                  <span className="filter_grid_added" >
                                    <i className="fas fa-heart" />
                                  </span>
                                </label>
                              )} */}
                               
                            </div>
                            </Link>
                          </div>
  </>
                        )
                      }) :
                      <>
                        {
                        isLoading ?
                          <div style={{ margin:"auto" }}>
                            <ReactLoading type="balls" color={"#270D44"} height={150} width={150} />
                          </div>
                          :
                          <div style={{ margin:"auto" }}>
                            <p>There is no jobs to list with the current filter</p>
                            <div className='text-center'>
                            <button
                              className={`btn list_view mb-2 `} onClick={resetFilter}>Reset Filter</button>
                              </div>
                          </div>
                        }

                      </>
                  }
                </div>
              }


              <div class="d-flex justify-content-center">
                <ReactPaginate
                  previousLabel="Prev"
                  nextLabel="Next"
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
              
             
            </div>
               


                            {/* ad */}
                            <div className='col-md-3 vgad'>

                            <Browsead />

                            <Browsead />

                            <Browsead />

                            <Browsead />

                            <Browsead />
                            </div>

                {/* <ins className="adsbygoogle" style={{display: 'block'}} data-ad-client="ca-pub-3502028008615885" data-ad-slot={4102552451} data-ad-format="auto" data-full-width-responsive="true" /> */}
                </div>




          </div>
        </div>
      </div>



    </div>
  )
}
export default BrowseFilterList;