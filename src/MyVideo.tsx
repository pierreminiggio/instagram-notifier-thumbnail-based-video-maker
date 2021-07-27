import {CSSProperties} from "react";
import './font.css';
import {Img, interpolate, Sequence, useCurrentFrame} from "remotion";
import durationInFrames from "./durationInFrames";
import yt from './yt.png'

const fontBackgroundColor = '#F57C00'
const fontShadowWidthPx = '13px'
const fontShadowHeightPx = '13px'

const textDivStyle: CSSProperties = {
	position: 'absolute',
	width: '100%',
	left: 0,
	top: '65%',
	right: 0,
}

interface MyVideoProps {
	thumbnail: string;
	title: string;
}

const cropSize = 60

export const MyVideo: React.FC<MyVideoProps> = ({thumbnail, title}: MyVideoProps) => {
	const frame = useCurrentFrame()

	const backgroundOpacity = Math.min(interpolate(
		frame,
		[0, 10],
		[0, 1]
	), 1)

	const newNegativeMargin = Math.min(interpolate(
		frame,
		[0, 10],
		[-500, 0]
	), 0)

	const youtubePositiveMargin = Math.max(interpolate(
		frame,
		[20, 30],
		[500, 0]
	), 0)

	const videoTextOpacity = Math.min(interpolate(
		frame,
		[30, 40],
		[0, 1]
	), 1)

	const thumbnailAndTitleOpacity = Math.min(interpolate(
		frame,
		[50, 80],
		[0, 1]
	), 1)

	const bioLinkPositiveMargin = Math.max(interpolate(
		frame,
		[100, 105],
		[300, 0]
	), 0)

	return (
		<>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="Black background"
			>
				<div style={{
					backgroundColor: '#000000',
					width: '100%'
				}} />
			</Sequence>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="Blurred thumbnail"
			>
				<Img
					src={thumbnail}
					style={{
						opacity: backgroundOpacity,
						filter: 'blur(50px)'
					}}
				/>
			</Sequence>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="New"
			>
				<h1
					style={{
						fontFamily: 'Montserrat',
						color: '#FFFFFF',
						fontSize: 120,
						marginLeft: 140 + newNegativeMargin
					}}
				>New</h1>
			</Sequence>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="Youtube"
			>
				<Img
					src={yt}
					width={690 / 3}
					height={484 / 3}
					style={{
						marginTop: 70,
						marginLeft: 700 + youtubePositiveMargin
					}}
				/>
			</Sequence>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="Video"
			>
				<h1
					style={{
						opacity: videoTextOpacity,
						fontFamily: 'Montserrat',
						color: '#FFFFFF',
						fontSize: 250,
						textAlign: 'center',
						width: '100%',
						marginTop: 250
					}}
				>Video !</h1>
			</Sequence>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="thumbnail"
			>
				<div
					style={{
						opacity: thumbnailAndTitleOpacity,
						marginTop: 750,
						marginLeft: 'auto',
						marginRight: 'auto',
						width: 480 * 1.5,
						height: (360 * 1.5) - (cropSize * 2),
						overflow: 'hidden'
					}}
				>
					<Img
						src={thumbnail}
						width={480 * 1.5}
						height={360 * 1.5}
						style={{
							margin: '-' + cropSize + 'px 0 0 0'
						}}
					/>
				</div>
			</Sequence>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="Title"
			>
				<div style={{
					opacity: thumbnailAndTitleOpacity,
					fontFamily: 'Montserrat',
					fontSize: 60,
					lineHeight: 1.15,
					color: '#FFFFFF',
					textAlign: 'center',
					paddingTop: '6px',
					position: 'relative',
					width: '100%'
				}}>
					<div style={textDivStyle}>
						<span style={{
							backgroundColor: fontBackgroundColor,
							color: 'transparent',
							boxShadow:
								fontShadowWidthPx + ' 0 0 '
								+ fontBackgroundColor
								+ ',-' + fontShadowWidthPx + ' 0 0 '
								+ fontBackgroundColor
								+ ',' + fontShadowWidthPx + ' ' + fontShadowHeightPx + ' 0 '
								+ fontBackgroundColor
								+ ',-' + fontShadowWidthPx + ' -' + fontShadowHeightPx + ' 0 '
								+ fontBackgroundColor
								+ ',' + fontShadowWidthPx + ' -' + fontShadowHeightPx + ' 0 '
								+ fontBackgroundColor
								+ ',-' + fontShadowWidthPx + ' ' + fontShadowHeightPx + ' 0 '
								+ fontBackgroundColor
							,
							opacity: 0.7
						}}>{title}</span>
					</div>
					<div style={textDivStyle}>
						{title}
					</div>
				</div>
			</Sequence>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="Link in bio"
			>
				<h1
					style={{
						fontFamily: 'Montserrat',
						color: '#FFFFFF',
						fontSize: 120,
						textAlign: 'center',
						width: '100%',
						marginTop: 1720 + bioLinkPositiveMargin
					}}
				>Link in bio !</h1>
			</Sequence>
		</>
	);
};
