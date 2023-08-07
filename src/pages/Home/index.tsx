import { ReactElement, useEffect, useRef } from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
  }

  .section-one {
    background-image: url("/temp.gif");
  }

  .section-two {
    background-color: yellow;
  }

  .section-three {
    background-color: blue;
  }
`;

const Home = (): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();

      const { deltaY } = e;
      const scrollTop = ref.current?.scrollTop ?? 0;
      const pageHeight = window.innerHeight;

      // 스크롤 내릴 때
      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          ref.current?.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          ref.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          ref.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      }
      // 스크롤 올릴 때
      else {
        // eslint-disable-next-line no-lonely-if
        if (scrollTop > pageHeight * 2) {
          ref.current?.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop > pageHeight && scrollTop <= pageHeight * 2) {
          ref.current?.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        } else {
          ref.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };
    const { current } = ref;
    current?.addEventListener("wheel", wheelHandler);
    return () => {
      current?.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <Wrapper ref={ref}>
      <section className="section-one">1</section>
      <section className="section-two">2</section>
      <section className="section-three">3</section>
    </Wrapper>
  );
};

export default Home;
