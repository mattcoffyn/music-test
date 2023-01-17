import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AudioPlayer } from '../components/Player';
import Category from '../components/Category';
import Login from 'components/Login';
import data from '../public/data.json';
import categoryData from '../public/categories.json';

export default function Index({ hasReadPermission }) {
  const router = useRouter();

  const [trackPlaying, setTrackPlaying] = useState(0);

  const updateTrack = (trackToUpdate) => {
    setTrackPlaying(trackToUpdate);
    return;
  };

  if (!hasReadPermission) {
    return <Login redirectPath={router.asPath} />;
  }

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
