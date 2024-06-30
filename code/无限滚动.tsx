import { useCallback, useEffect, useRef, useState } from "react";

const fetchData = (index: number) => {
	console.log(index);
	return new Promise<number[]>((res) =>
		setTimeout(() => res([1, 2, 3].map((x) => x + index)), 2000),
	);
};

export default function InfiniteScroll() {
	const [list, setList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleScroll = useCallback(() => {
		if (isLoading) return;
		const container = containerRef.current;
		if (!container) return;
		const scrollHeight = container.scrollHeight;
		const scrollTop = container.scrollTop;
		const clientHeight = container.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight - 50) {
			setIsLoading(true);
			const page = list.length + 1;
			fetchData(page).then((res) => {
				setList(list.concat(res));
				setIsLoading(false);
			});
		}
	}, [isLoading, list]);

	useEffect(() => {
		setIsLoading(true);
		fetchData(0).then((data) => {
			setList(data);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		containerRef.current?.addEventListener("scroll", handleScroll);
		return () =>
			containerRef.current?.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return (
		<div ref={containerRef} className="h-[500px] overflow-auto">
			{list.map((item, idx) => (
				<div key={idx} className=" mt-2 h-60 w-60 bg-slate-100">
					{item}
				</div>
			))}
			{isLoading && <div>Loading...</div>}
		</div>
	);
}
