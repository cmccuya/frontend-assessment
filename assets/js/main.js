// globals
"use strict"

fetch(window.location.origin + '/assets/js/data.json')
	.then(function(response) {
		return response.json()
	})
	.then(function(data) {
		console.log(data);
		var tabsWrapper = document.querySelector('.menu');
		var contentWrapper = document.querySelector('.tab-content');
		var menuItems = '';
		var menuContent = '';
		data.forEach(function(section, i) {
			menuItems += i === 0 
				? '<li class="tab active">' + section.title + '</li>' 
				: '<li class="tab">' + section.title + '</li>';
			menuContent += i === 0 
				? '<h4> '+ section.title +' </h4> <div id=tab-'+ i +' class="content active">' + section.content + '</div>' 
				: '<h4> '+ section.title +' </h4> <div id=tab-'+ i +' class="content">' + section.content + '</div>' 
		})
		tabsWrapper.innerHTML = menuItems;
		contentWrapper.innerHTML = menuContent;

		addClickEvent()
	})

function addClickEvent () {
	var tabMenu = document.querySelectorAll('.tab-menu li');

	tabMenu.forEach(function(menu, i) {
		menu.addEventListener("click", function(tabClickEvent) {

			document.querySelector('.tab-menu li.active').classList.remove('active')
			document.querySelectorAll('.tab-menu li')[i].classList.add('active')

			document.querySelector('.tab-content .content.active').classList.remove('active')
			document.querySelectorAll('.tab-content .content')[i].classList.add('active')
		});
	})

	var tabHeading = document.querySelectorAll('.tab-content h4');

	tabHeading.forEach(function(heading, i) {
		heading.addEventListener("click", function() {
			var clicked = document.querySelectorAll('.tab-content .content')[i]

			document.querySelector('.tab-menu li.active').classList.remove('active')
			document.querySelectorAll('.tab-menu li')[i].classList.add('active')

			if(clicked.classList.contains('active')) {
				clicked.classList.remove('active')
			} else {
				if(document.querySelector('.tab-content .content.active')) {
					document.querySelector('.tab-content .content.active').classList.remove('active')
				}
				clicked.classList.add('active')
			}
		})
	})
}

window.addEventListener('resize', function() {
	if(window.innerWidth >= 992) {
		if(!document.querySelector('.tab-content .content.active')) {
			document.querySelector('.menu li.active').classList.remove('active')
			document.querySelectorAll('.tab-content .content')[0].classList.add('active')
			document.querySelectorAll('.menu li')[0].classList.add('active')
		}
	} 
})