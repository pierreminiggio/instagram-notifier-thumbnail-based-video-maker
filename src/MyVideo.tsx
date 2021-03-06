import {CSSProperties, useMemo} from "react";
import './font.css';
import {Audio, Img, interpolate, Sequence, useCurrentFrame} from "remotion";
import durationInFrames from "./durationInFrames";
import yt from './yt.png'
import space from './space.mp3'

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

const thumbnailBackgroundStartFrame = 0
const newTextStartFrame = 0
const youtubeStartFrame = 20
const videoTextStartFrame = 30
const thumbnailAndTitleStartFrame = 50
const bioLinkStartFrame = 90

export const MyVideo: React.FC<MyVideoProps> = ({thumbnail, title}: MyVideoProps) => {
	const frame = useCurrentFrame()

	const textColor = useMemo<string>(() => {
		if (frame < 300) {
			return '#FFFFFF'
		}

		if (frame < 555) {
			return 'rgb(255, ' + Math.max(interpolate(
				frame,
				[300, 555],
				[255, 0]
			), 0) + ', 255)'
		}

		return 'rgb(' + Math.max(interpolate(
			frame,
			[555, 810],
			[255, 0]
		), 0) + ', ' + Math.min(interpolate(
			frame,
			[555, 810],
			[0, 255]
		), 255) + ', 255)'

	}, [frame])

	const fontBackgroundAndShadowOpacity = Math.max(interpolate(
		frame,
		[200, 350],
		[1, 0]
	), 0)

	const backgroundOpacity = Math.min(interpolate(
		frame,
		[thumbnailBackgroundStartFrame, 10],
		[0, 1]
	), 1)

	const newTextNegativeMargin = Math.min(interpolate(
		frame,
		[newTextStartFrame, 10],
		[-500, 0]
	), 0)

	const youtubePositiveMargin = Math.max(interpolate(
		frame,
		[youtubeStartFrame, 30],
		[500, 0]
	), 0)

	const videoTextOpacity = Math.min(interpolate(
		frame,
		[videoTextStartFrame, 40],
		[0, 1]
	), 1)

	const thumbnailAndTitleOpacity = Math.min(interpolate(
		frame,
		[thumbnailAndTitleStartFrame, 80],
		[0, 1]
	), 1)

	const bioLinkPositiveMargin = Math.max(interpolate(
		frame,
		[bioLinkStartFrame, 100],
		[300, 0]
	), 0)

	const audioVolume = Math.max(interpolate(
		frame,
		[783, 898],
		[1, 0]
	), 0)

	return (
		<>
			<Sequence
				from={newTextStartFrame}
				durationInFrames={durationInFrames}
				name="Black background"
			>
				<div style={{
					backgroundColor: '#000000',
					width: '100%'
				}} />
			</Sequence>
			<Sequence
				from={thumbnailBackgroundStartFrame}
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
						color: textColor,
						fontSize: 120,
						marginLeft: 140 + newTextNegativeMargin
					}}
				>New</h1>
			</Sequence>
			<Sequence
				from={youtubeStartFrame}
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
				from={videoTextStartFrame}
				durationInFrames={durationInFrames}
				name="Video"
			>
				<h1
					style={{
						opacity: videoTextOpacity,
						fontFamily: 'Montserrat',
						color: textColor,
						fontSize: 250,
						textAlign: 'center',
						width: '100%',
						marginTop: 250
					}}
				>Video !</h1>
			</Sequence>
			<Sequence
				from={thumbnailAndTitleStartFrame}
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
				from={thumbnailAndTitleStartFrame}
				durationInFrames={durationInFrames}
				name="Title"
			>
				<div style={{
					opacity: thumbnailAndTitleOpacity,
					fontFamily: 'Montserrat',
					fontSize: 60,
					lineHeight: 1.15,
					color: textColor,
					textAlign: 'center',
					paddingTop: '6px',
					position: 'relative',
					width: '100%'
				}}>
					<div style={textDivStyle}>
						<span style={{
							opacity: fontBackgroundAndShadowOpacity,
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
						}}>{title}</span>
					</div>
					<div style={textDivStyle}>
						{title}
					</div>
				</div>
			</Sequence>
			<Sequence
				from={bioLinkStartFrame}
				durationInFrames={durationInFrames}
				name="Link in bio"
			>
				<h1
					style={{
						fontFamily: 'Montserrat',
						color: textColor,
						fontSize: 120,
						textAlign: 'center',
						width: '100%',
						marginTop: 1720 + bioLinkPositiveMargin
					}}
				>Link in bio !</h1>
			</Sequence>
			<Sequence
				from={0}
				durationInFrames={durationInFrames}
				name="Music"
			>
				<Audio src={space} volume={audioVolume} />
			</Sequence>
		</>
	);
};
