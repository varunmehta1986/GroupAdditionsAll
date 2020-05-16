import '../../src/group-additions-app/group-additions-app';
import { fixture, html, expect } from '@open-wc/testing';

describe("Group Additions App", () => {
  it("should hide application type selection on load", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    expect(el.hideApplicationTypeSelection).to.equal(true);
  });
  it("should hide the redirect dialog on load", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    expect(el.hideRedirectDialog).to.equal(true);
  });
  it("should hide the application types selection on load", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    expect(el.hideApplicationTypes).to.equal(true);
  });
  it("should reset the application form when the old application redirect dialog is closed", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    el.hideRedirectDialog = false;
    el.requestUpdate();
    expect(el.hideRedirectDialog).to.equal(false);
    el.resetApplicationFormSelection(null);
    expect(el.hideRedirectDialog).to.equal(true);
  });
  it("should show the redirect dialog if it's an old application form", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    let formSelection = JSON.stringify({useWebApp: false});
    let changeEvent = new CustomEvent('form-changed', {
                detail: {
                    message: formSelection
                }
    });
    el.onApplicationFormSelection(changeEvent);
    expect(el.hideRedirectDialog).to.equal(false);
  });
  it("should show the application type selection if it's a combined app", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    let formSelection = JSON.stringify({useWebApp: true});
    let changeEvent = new CustomEvent('form-changed', {
                detail: {
                    message: formSelection
                }
    });
    el.onApplicationFormSelection(changeEvent);
    expect(el.hideApplicationTypeSelection).to.equal(false);
  });
  it("should show the application type selection if it's a combined app", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    let formSelection = JSON.stringify({useWebApp: true});
    let changeEvent = new CustomEvent('form-changed', {
                detail: {
                    message: formSelection
                }
    });
    el.onApplicationFormSelection(changeEvent);
    expect(el.hideApplicationTypeSelection).to.equal(false);
  });
  it("should show the company selections when an application type has been selected", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    const applicationTypeSelected = new CustomEvent("applicationType-selected", {
                detail: {
                    message: "New Enrollee"
                }
    });
    el.onApplicationTypeSelection(applicationTypeSelected);
    expect(el.hideApplicationTypes).to.equal(false);
  });
  it("should hide the company selections when an application type has not been selected", async () => {
    const el = await fixture(html`<group-additions-app></group-additions-app>`);
    const applicationTypeSelected = new CustomEvent("applicationType-selected", {
                detail: {
                    message: ""
                }
    });
    el.onApplicationTypeSelection(applicationTypeSelected);
    expect(el.hideApplicationTypes).to.equal(true);
  });
});

