import {Composition} from 'remotion';
import {MyVideo} from './MyVideo';
import durationInFrames from "./durationInFrames";

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="MyVideo"
				component={MyVideo}
				durationInFrames={durationInFrames}
				fps={60}
				width={1080}
				height={1920}
				defaultProps={{
					thumbnail: 'https://www.stored-youtube-video-thumbnails.ggio.fr/61',
					title: 'Elon Musk Advice to 20 years old self - Elon Musk Advice for Students',
				}}
			/>
		</>
	);
};
