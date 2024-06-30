export default function Carousel() {
	const [index, setIndex] = useState(1);

	const list = useMemo(
		() => [dataSource.at(-1), ...dataSource, dataSource[0], dataSource[1]],
		[],
	);

	useEffect(() => {
		setTimeout(
			() => setIndex((index + 1) % (list.length - 1) || 1),
			index === list.length - 2 ? 300 : 2000,
		);
	}, [index, list.length]);

	return (
		<div className="w-[1000px] h-[700px] flex items-center justify-center overflow-hidden">
			<div className="w-[500px] h-[500px]">
				<div
					className="flex"
					style={{
						width: `${100 * list.length}%`,
						transform: `translateX(-${(100 / list.length) * index}%)`,
						transition: index === 1 ? "" : "transform 0.3s",
					}}
				>
					{list.map((data, idx) => {
						return (
							<img
								className={classnames("w-[500px] h-[500px]", {
									["scale-125"]: idx === index,
									["transition-all duration-[300]"]: index !== 1,
								})}
								src={data}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
