type Props = {
  src: string;
  alt: string;
  caption: string;
};

export const Image = (props: Props) => (
  <figure class="full-width">
    <img src={props.src} alt={props.alt} />
    <figcaption class="text-center">{props.caption}</figcaption>
  </figure>
);
