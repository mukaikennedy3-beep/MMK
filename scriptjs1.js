document.addEventListener("mouseup", function (e) {
		const suggestionBox = document.getElementById("suggBox");
		if (suggestionBox && !suggestionBox.contains(e.target)) {
			suggestionBox.style.display = "none";
		}
	});

document.addEventListener("click", function (e) {
		const listItem = e.target.closest("ul.result_box li");
		if (listItem) {
			const valattr = listItem.textContent;
			document.querySelector('.keyword').value = valattr;
			document.getElementById("suggBox").style.display = "none";
			document.getElementById("searchForm").submit();
		}
	});

	const keywordInput = document.querySelector(".keyword");

	keywordInput.addEventListener("keyup", function (e) {
		const code = e.keyCode || e.which;
		const inputElement = e.target;
		const suggestList = inputElement.closest('.juice_searchForm');
		const resultBoxLi = suggestList.querySelectorAll('.result_box li');

		if ([37, 38, 39, 40].includes(code)) {
			let selectedLi = suggestList.querySelector('.result_box li.selected');
			let index = selectedLi ? Array.from(selectedLi.parentElement.children).indexOf(selectedLi) : -1;

			resultBoxLi.forEach(li => li.classList.remove('selected'));

			let newIndex;
			if (code === 38) { // Up
				newIndex = index - 1 < 0 ? resultBoxLi.length - 1 : index - 1;
			} else if (code === 40) { // Down
				newIndex = index + 1 >= resultBoxLi.length ? 0 : index + 1;
			}

			if (newIndex !== undefined) {
				resultBoxLi[newIndex].classList.add('selected');
				inputElement.value = resultBoxLi[newIndex].textContent;
			}
		} else if (code === 13) {
			document.getElementById("suggBox").style.display = "none";
		} else {
			const inputValue = keywordInput.value.trim();
			if (!inputValue) return;

			const url = "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=" + encodeURIComponent(inputValue);

			// Clean up any previous script
			const oldScript = document.getElementById("jsonpScript");
			if (oldScript) oldScript.remove();

			const script = document.createElement("script");
			script.src = url + "&callback=handleResponse";
			script.id = "jsonpScript";
			document.body.appendChild(script);
		}
	});

	function changeSel(element) {
		document.querySelectorAll('.result_box li').forEach(item => item.classList.remove('selected'));
		element.classList.add('selected');
		document.querySelector('.keyword').value = element.textContent;
	}

	function handleResponse(data) {
		const suggestionBox = document.getElementById("suggBox");
		const suggestions = data[1];

		if (!suggestions.length) {
			suggestionBox.innerHTML = "";
			suggestionBox.style.display = "none";
			return;
		}

		let html = `<ul class="result_box">`;
		suggestions.forEach(([suggestion]) => {
			html += `<li class="search_result" onmouseover="changeSel(this)">${suggestion}</li>`;
		});
		html += `</ul>`;

		suggestionBox.innerHTML = html;
		suggestionBox.style.display = "block";
	}
	// Handle upload
	videoinput.addEventListener('change',async(e) =>{
		videoFile=e.target.File[0];
		if(!videoFile) return;
		peview.src=URL.createObjectURLURL(videoFile);
await loadFFmpeg();
});