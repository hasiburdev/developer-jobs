const findJobsBtn = document.querySelector('.button-container')


findJobsBtn.addEventListener('click', () => {
    let searchText = document.querySelector('#filter-jobs').value
    let searchPlace = document.querySelector('#filter-places').value
    let searchCompany = document.querySelector('#filter-company').value.toString()



    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, searchText, searchPlace,searchCompany)
        showJobs(filteredJobs)
    })
})
const getJobs = async () => {
    return fetch('https://hr-hasan.github.io/developer-jobs/data/data.json')
    .then(response => response.json())
    .then(data => {
        return data
    })
}

function showJobs(jobs) {
    const jobsContainer = document.querySelector('.jobs-container') 
    let htmlJobs = ''
    jobs.forEach(job => {

        htmlJobs += `<div class="job-tile">
        <div class="top">
            <img src="${job.logo}" alt="">
            <span class="material-icons more_horiz">more_horiz</span>
        </div>
        <div class="rolename">
            <span>${job.roleName}</span>
    
        </div>
        <div class="description">
            <span>${job.requirements.content}</span>
        </div>
        <div class="buttons">
            <div class="button apply-now">
                <a href='${job.applicationLink}'>
                    Apply Now
                </a>
            </div>
            <div class="button message">
                <a href='${job.website}'>
                 Message
                </a>
            </div>
        </div>
    </div>
    `
    })
    jobsContainer.innerHTML = htmlJobs
}

function filterJobs(jobs, searchText, searchPlace,searchCompany) {
    let filteredJobs = []
    if(searchText || searchCompany || searchPlace) {
        filteredJobs = jobs.filter(job => {
            if(searchText) {
                if(job.roleName.toLowerCase().includes(searchText)
                || job.type.toLowerCase().includes(searchText)
                || job.requirements.content.toLowerCase().includes(searchText)
                ) {
                    return true
                }
            }
            else if (searchPlace && job.location.toLowerCase().includes(searchPlace)){
                return true
            }
            else if(searchCompany && job.company.toLowerCase().includes(searchCompany)) {
                return true
            }
            else {
                return false
            }

        })
    } 
    else {
        filteredJobs = jobs
    }
    return filteredJobs
}


function toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  }

getJobs().then(data => {
    showJobs(data)
})
