//分片
const inputDom = document.querySelector("input");
const chunkSize = 1024 * 1024;
const chunks = [];
inputDom.onchange = (e) => {
	const file = inputDom.files[0];
	for (let i = 0; i < file.size; i = i + chunkSize) {
		chunks.push(file.slice(i, i + chunkSize));
	}
};

//计算hash
function calFileMd5Fn(chunks, progressCallbackFn) {
	return new Promise((resolve, reject) => {
		let currentChunk = 0;
		const spark = new SparkMD5.ArrayBuffer();
		const fileReader = new FileReader();
		fileReader.onerror = reject;
		fileReader.onload = (e) => {
			progressCallbackFn(Math.ceil((currentChunk / chunks.length) * 100));
			spark.append(e.target.result);
			if (++currentChunk < chunks.length)
				fileReader.readAsArrayBuffer(chunks[currentChunk]);
			else resolve(spark.end());
		};
		fileReader.readAsArrayBuffer(chunks[currentChunk]);
	});
}

const hash = await calFileMd5Fn(chunks);

//选择需要上传的分片
const formDataList = chunks
	.filter((idx) => !doneFileList.includes(idx)) //doneFileList为后端返回已经上传了的分片下标
	.map((item, index) => {
		const formData = new FormData();
		formData.append("file", item);
		formData.append("chunks", chunks.length);
		formData.append("chunk", index);
		formData.append("name", fileName);
		formData.append("md5", fileMd5);
		return { formData };
	});

//并发上传
const fileUpload = (formDataList) => {
	const requestListFn = formDataList.map(
		async ({ formData }) => await sliceFileUploadFn(formData),
	);
	return Promise.allSettled(requestListFn);
};
