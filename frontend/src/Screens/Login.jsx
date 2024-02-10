import React from "react";
import * as Components from "./LoginDesign";

function Component() {
  const [signIn, toggle] = React.useState(true);
  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Name" />
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>

          <Components.Button>LogIn</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>
              <img src="/PERSONOVEL.png" alt="" />
            </Components.Title>
            <Components.Paragraph>
              Embark on an exhilarating literary journey beyond the realms of
              imagination, where each subscription unlocks a portal to
              captivating worlds, riveting characters, and uncharted narratives
              that will keep you on the edge of your seat—welcome to a
              subscription like no other, where the next chapter is always an
              adventure waiting to unfold.{" "}
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>
              <img src="/PERSONOVEL.png" alt="" />
            </Components.Title>
            <Components.Paragraph>
              Step into a realm of endless stories tailored just for you, where
              every login welcomes you to a sanctuary of literary delights,
              awaiting the turn of each digital page to transport you to worlds
              unknown—your personalized escape into the extraordinary begins
              now.{" "}
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sigin Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Component;
