// ********************************************************
// Globals
// ********************************************************
let page = 1;
let table = document.querySelector('.tab-pane.active table:first-of-type');
let accounts = [];

let tableObserver = new MutationObserver(function(mutations) {
	// we only monitor the main table and count the rows each time
	let rows = document.querySelectorAll('.tab-pane.active thead + tbody tr');
	if(rows.length > 0) {
		// there's data here!
		parseVisibleRows();
		nextPage();
	}
	// stop if the next button is disabled
	else if(document.querySelector('.tab-pane.active .pagination li.disabled:has(.fa-angle-right)') != null ) {
		console.clear();
		tableObserver.disconnect();
		accounts.unshift('"ID","Last Name","First Name","Last Signed In"');
		console.log(accounts.join('\n'));
	}
});

// ********************************************************
// Functions 
// ********************************************************
function parseVisibleRows() {
	let rows = document.querySelectorAll('.tab-pane.active thead + tbody tr');
	for(let r of rows) {
		let id = r.querySelector('td:nth-of-type(2)').innerText;
		let role = r.querySelector('td:nth-of-type(5)').innerText;
		let lname = r.querySelector('td:nth-of-type(6)').innerText;
		let fname = r.querySelector('td:nth-of-type(7)').innerText;
		let login = r.querySelector('td:nth-of-type(3)').innerText;
		let datetime = login.replace(' at ',' '); // makes it Google Sheet friendly

		if(role.trim() == '') {
			accounts.push('"' + [id, lname, fname, datetime].join('","') + '"');
		} 
	}
	console.log(`Scanned page ${page}... ${accounts.length} roleless account(s) found so far.`);
}

function nextPage() {
	let next = document.querySelector('.tab-pane.active .pagination a:has(.fa-angle-right)');
	if(!next.parentNode.classList.contains('disabled')) {
		page = page + 1;
		next.click();
	}
}

// ********************************************************
// Main Code
// ********************************************************

// Start Observer
tableObserver.observe(table, { subtree: true, childList: true });

// get first page
console.clear();
parseVisibleRows();
// click next page and let the mutation observer handle the rest
nextPage();
