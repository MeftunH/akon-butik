import { Link } from "react-router-dom";

export default function BlogDetails() {
  return (
    <section className="s-blog-detail flat-spacing">
      <div className="container">
        <div className="row flex-wrap-reverse">
          <div className="col-xl-3">
            <div className="blog-detail_info mt-xl-0 sticky-top">
              <div className="date-post">
                <p className="title-label h6">Date</p>
                <h6 className="entry_date">April 8, 2025</h6>
              </div>
              <div className="share-post">
                <p className="title-label h6">Share</p>
                <ul className="tf-social-icon">
                  <li>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      className="social-facebook"
                    >
                      <span className="icon">
                        <i className="icon-fb" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      className="social-instagram"
                    >
                      <span className="icon">
                        <i className="icon-instagram-logo" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/"
                      target="_blank"
                      className="social-x"
                    >
                      <span className="icon">
                        <i className="icon-x" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/"
                      target="_blank"
                      className="social-tiktok"
                    >
                      <span className="icon">
                        <i className="icon-tiktok" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tag-post">
                <p className="title-label">Tags</p>
                <ul className="tag-list">
                  <li>
                    <a href="#" className="link">
                      #Accessories
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      #Layering
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      #Style
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      #Layering
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      #Vintage
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      #Denim
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="blog-detail_content tf-grid-layout">
              <div className="box-text">
                <p className="h4 text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  porta purus scelerisque felis condimentum, a lobortis mauris
                  viverra. Sed et nisl maximus, gravida purus et, condimentum
                  libero. Aenean sollicitudin mauris ac dolor ullamcorper, vel
                  ornare enim mollis. Mauris congue augue felis, ac scelerisque
                  augue fringilla at.
                </p>
                <p className="h6">
                  Cras tincidunt lectus orci, vitae consequat nibh porttitor
                  sed. Quisque sapien odio, scelerisque et ipsum ac, hendrerit
                  scelerisque eros. Suspendisse congue id felis eget auctor.
                  Praesent nec augue rutrum, posuere tellus in, aliquet enim. In
                  quis justo rutrum, faucibus sem tristique, feugiat sapien.
                  Pellentesque felis enim, iaculis vitae sem in, rhoncus congue
                  urna. Cras vitae tortor posuere lorem consectetur tempor id id
                  eros. Proin sed eleifend nisl, eu faucibus purus. Duis
                  faucibus ac nibh venenatis posuere. Proin vel tellus id ex
                  commodo ultricies vitae a augue. Mauris mattis blandit enim
                  nec cursus. Quisque placerat felis eget dui cursus, non
                  fringilla lacus lobortis.
                </p>
              </div>
              <div>
                <div className="entry_image">
                  <img
                    src="/images/blog/single-1.jpg"
                    alt="Blog"
                    className="lazyload"
                    width={1602}
                    height={630}
                  />
                </div>
                <div className="quote-blog">
                  <div className="icon">
                    <i className="icon-quote-2" />
                  </div>
                  <p className="quote h4">
                    Nam auctor ante id lorem sodales venenatis. Cras vitae felis
                    a erat dapibus dignissim nec ac mi. Sed scelerisque
                    vestibulum tortor, et luctus nisi hendrerit mattis.
                  </p>
                </div>
              </div>
              <div className="box-text">
                <p className="h6">
                  Integer molestie dolor in tellus ultricies rhoncus. Aenean
                  venenatis tincidunt diam, condimentum sagittis nibh cursus
                  vel. Aliquam sed nisi egestas, pharetra quam eu, feugiat ex.
                  Phasellus consequat, mauris eu sodales lacinia, est tellus
                  vehicula dui, quis iaculis nisl nulla non turpis.
                </p>
                <p className="h6">
                  Nam auctor ante id lorem sodales venenatis. Cras vitae felis a
                  erat dapibus dignissim nec ac mi. Sed scelerisque vestibulum
                  tortor, et luctus nisi hendrerit mattis. Donec at dignissim
                  erat, et tempor nulla. Cras suscipit, lacus quis pharetra
                  congue, nisl diam congue nisl, sed fermentum tellus ipsum non
                  mi. Donec eget mauris fringilla, dignissim dui id, blandit
                  erat. Orci varius natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus
                </p>
                <p className="h6">
                  Suspendisse id leo vestibulum, tempus massa lobortis, laoreet
                  risus. Nullam dui lorem, porttitor non pellentesque sed,
                  laoreet sit amet sem. Nam fermentum ipsum ac enim fringilla
                  fermentum
                </p>
              </div>
              <div className="entry_image tf-grid-layout sm-col-2">
                <div className="image">
                  <img
                    src="/images/blog/single-2.jpg"
                    alt="Blog"
                    className="lazyload"
                    width={1020}
                    height={724}
                  />
                </div>
                <div className="image">
                  <img
                    src="/images/blog/single-3.jpg"
                    alt="Blog"
                    className="lazyload"
                    width={1020}
                    height={724}
                  />
                </div>
              </div>
              <div className="box-text">
                <p className="h6">
                  Integer molestie dolor in tellus ultricies rhoncus. Aenean
                  venenatis tincidunt diam, condimentum sagittis nibh cursus
                  vel. Aliquam sed nisi egestas, pharetra quam eu, feugiat ex.
                  Phasellus consequat, mauris eu sodales lacinia, est tellus
                  vehicula dui, quis iaculis nisl nulla non turpis.
                </p>
                <p className="h6">
                  Nam auctor ante id lorem sodales venenatis. Cras vitae felis a
                  erat dapibus dignissim nec ac mi. Sed scelerisque vestibulum
                  tortor, et luctus nisi hendrerit mattis. Donec at dignissim
                  erat, et tempor nulla. Cras suscipit, lacus quis pharetra
                  congue, nisl diam congue nisl, sed fermentum tellus ipsum non
                  mi. Donec eget mauris fringilla, dignissim dui id, blandit
                  erat. Orci varius natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus
                </p>
                <p className="h6">
                  Suspendisse id leo vestibulum, tempus massa lobortis, laoreet
                  risus. Nullam dui lorem, porttitor non pellentesque sed,
                  laoreet sit amet sem. Nam fermentum ipsum ac enim fringilla
                  fermentum
                </p>
              </div>
              <span className="br-line" />
              <div className="group-direc">
                <a href="#" className="btn-direc prev link">
                  <img
                    src="/images/blog/direc-1.jpg"
                    alt=""
                    className="lazyload"
                    width={224}
                    height={152}
                  />
                  <div className="content">
                    <p className="fw-medium text-uppercase">Previous post</p>
                    <p className="name-post h6">
                      April 4th the biggest sale of the year
                    </p>
                  </div>
                </a>
                <span className="br-line" />
                <a href="#" className="btn-direc next link">
                  <div className="content">
                    <p className="fw-medium text-uppercase">Previous post</p>
                    <p className="name-post h6">
                      April 4th the biggest sale of the year
                    </p>
                  </div>
                  <img
                    src="/images/blog/direc-2.jpg"
                    alt=""
                    className="lazyload"
                    width={224}
                    height={152}
                  />
                </a>
              </div>
              <span className="br-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
