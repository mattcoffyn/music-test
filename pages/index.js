import { AudioPlayer } from '../components/Player';
import { useState } from 'react';
import Category from '../components/Category';
import data from '../public/data.json';
import categoryData from '../public/categories.json';

export default function Index() {
  const [trackPlaying, setTrackPlaying] = useState(0);

  const updateTrack = (trackToUpdate) => {
    setTrackPlaying(trackToUpdate);
    return;
  };

  return (
    <>
      <section className="content">
        {categoryData.map(({ id, catId, title, catText }) => (
          <Category key={id} catId={catId} title={title} catText={catText}>
            <aside className="players">
              {data.map(
                ({ name, path, id, svgPath, category, type, duration }) =>
                  category === catId && (
                    <AudioPlayer
                      key={id}
                      trackId={id}
                      pathName={path}
                      name={name}
                      svgPath={svgPath}
                      trackPlaying={trackPlaying}
                      updateTrack={updateTrack}
                      type={type}
                      staticDuration={duration}
                    />
                  )
              )}
            </aside>
          </Category>
        ))}
      </section>
    </>
  );
}
