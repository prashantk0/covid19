/* ---------------------------------------------- */
/*            CODE EXPLAINED TUTORIALS            */
/*         www.youtube.com/CodeExplained          */
/* ---------------------------------------------- */
//SELECt ALL ELEMENTS

const country_name_element = document.querySelector('.country .name');
const total_cases_element = document.querySelector('.total-cases .value');
const new_cases_element = document.querySelector('.total-cases .new-value');
const recovered_element = document.querySelector('.recovered .value');
const new_recovered_element = document.querySelector('.recovered .new-value');
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector('.deaths .new-value');

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES

let app_data = [],
	cases_list = [],
	recovered_list = [],
	deaths_list = [],
	dates = [];
	formatedDates = [];

//GET USERS COUNTRY CODE

// let country_code = geoplugin_countryCode();
let user_country = "India";
// country_list.forEach( country => {
// 	if (country.code == country_code){
// 		user_country = country.name;
// 	}
// });

console.log(user_country);

fetchData(user_country);

function fetchData(country){
	
	
	country_name_element.innerHTML = `${country}`;



	cases_list = [],
	recovered_list = [],
	deaths_list = [],
	dates = [];
	formatedDates = [];

	let requestOptions = {
		method: "GET",
		redirect: "follow"
	};
	
	const api_fetch = async () => {
		await fetch(`https://api.covid19api.com/total/country/${country}/status/confirmed`, requestOptions)
	.then(response => {
		return response.json();
	})
	.then( data => {
	
		data.forEach( entry => {
			dates.push(entry.Date);
			cases_list.push(entry.Cases)
			
		})
		console.log(dates);
		console.log(cases_list);	
	})
	
	await fetch(`https://api.covid19api.com/total/country/${country}/status/recovered`, requestOptions)
	.then(response => {
		return response.json();
	
	})
	.then( data => {
	
		data.forEach( entry => {
			dates.push(entry.Date);
			recovered_list.push(entry.Cases)
		});
		console.log(recovered_list);	
	})
	
	await fetch(`https://api.covid19api.com/total/country/${country}/status/deaths`, requestOptions)
	.then(response => {
		return response.json();
	
	})
	.then( data => {
	
		data.forEach( entry => {
			dates.push(entry.Date);
			deaths_list.push(entry.Cases)
		});
		console.log(deaths_list);	
	})
	.catch(err => {
		console.error(err);
	});
	updateUI();
	};
	api_fetch();
	
}





//UPDATE UI FUNCTION

function updateUI(){
	updateStats();
	axesLinearChart();
}

function updateStats(){
	const total_cases = cases_list[cases_list.length - 1];
	const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

	const total_recovered = recovered_list[recovered_list.length - 1];
	const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];

	const total_deaths = deaths_list[deaths_list.length - 1];
	const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];

	
	total_cases_element.innerHTML = total_cases;
	new_cases_element.innerHTML = `+${new_confirmed_cases}`;
	recovered_element.innerHTML = total_recovered;
	new_recovered_cases.innerHTML = `+${new_recovered_cases}`;
	deaths_element.innerHTML = total_deaths;
	new_deaths_element.innerHTML = `+${new_deaths_cases}`;
	
	//FORMAT DATES

	dates.forEach( date => {
		formatedDates.push(formatDate(date));
	});
	console.log(formatedDates);

}

//UPDATE CHART

let my_chart;
function axesLinearChart(){

	if(my_chart){
		my_chart.destroy();
	}

	my_chart = new Chart(ctx, {
		type: 'line',
		data: {
		  datasets: [{
			label: "Cases",
			data: cases_list,
			fill: false,
			borderColor: "#FFF",
			backgroundColor: "#FFF",
			borderWidth: 1,
		  },
		  {
			label: "Recovered",
			data: recovered_list,
			fill: false,
			borderColor: "#009688",
			backgroundColor: "#009688",
			borderWidth: 1,
		  },
		  {
			label: "Deaths",
			data: deaths_list,
			fill: false,
			borderColor: "#f44336",
			backgroundColor: "#f44336",
			borderWidth: 1,
		  }
		],
		  labels: formatedDates
		},
		options: {
			responsive: true,
			maintainAspectRatio : false
		}
	  });
	   
}

/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */
/*
fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=country`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
			"x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
		}
	})
*/


// FORMAT DATES
const monthsNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
  ];
  
  function formatDate(dateString) {
	let date = new Date(dateString);
  
	return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
  }