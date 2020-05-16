import '../../../src/group-additions-app/data-entry/data-entry';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe("data entry tests", () => {
    it("should return false on validation if received date is empty", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.receivedDate = "";
        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Invalid Received Date");
        expect(element.receivedDateElement).has.attribute("invalid");
        expect(element.receivedDateElement).attribute("invalid").to.be.equal("true");
    });

    it("should return false on validation if received date is greater than todays date", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var receivedDate = "2099-12-31T00:00:00"; 
        element.receivedDateElement.setAttribute("value", receivedDate);
        element.receivedDate = receivedDate;
        var result = element.runValidations();

        console.log(element.receivedDateElement.value);
        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Invalid Received Date");
        expect(element.receivedDateElement).has.attribute("invalid");
        expect(element.receivedDateElement).attribute("invalid").to.be.equal("true");
    });
    it("should return false on validation if policy eligibiity is not valid", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";

        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Please select a Policy Eligibility Type");
    });
    it("should return false on validation if policy eligibiity date is not valid", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";

        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "9"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");

        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Invalid Policy Eligibility Date.");
    });
    it("should return false on validation if policy eligibiity date format is not valid", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";

        //select policy eligibilty other
        var policyElgible = {
            detail: {
                message: "11"
            }
        };

        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        //set an invalid date
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "sdsds");

        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Invalid Policy Eligibility Date.");
    });
    it("should return false if requirement doc element has no requirement type selected", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";

        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Requirement Document Type needs to be selected.");
    });
    it("should return false if requirement doc element has no requirement document uploaded", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";

        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;

        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Please select a file for all of the requirement document types.");
    });

    it("should return false if app document upload has no document selected", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";

        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";

        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Please select an Application Document.");
    });

    it("should return false if app document upload has blank health document description", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            healthGroup: "A12345",
            dentalGroup: "D12345",
            visionGroup: "V12345"
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";


        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";
        var appUploadDocumentHealthElement = element.appDocumentUpload.shadowRoot.getElementById("healthGroup");
        //set the document description to blank 
        appUploadDocumentHealthElement.documentDescription = "";


        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Health Document Description is Blank");
    });

    it("should return false if app document upload has blank dental document description", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            healthGroup: "A12345",
            dentalGroup: "D12345",
            visionGroup: "V12345"
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";


        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";
        var appUploadDocumentDentalElement = element.appDocumentUpload.shadowRoot.getElementById("dentalGroup");
        //set the document description to blank 
        appUploadDocumentDentalElement.documentDescription = "";


        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Dental Document Description is Blank");
    });
    it("should return false if app document upload has blank vision document description", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            healthGroup: "A12345",
            dentalGroup: "D12345",
            visionGroup: "V12345"
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";


        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";
        var appUploadDocumentVisionElement = element.appDocumentUpload.shadowRoot.getElementById("visionGroup");
        //set the document description to blank 
        appUploadDocumentVisionElement.documentDescription = "";


        var result = element.runValidations();

        expect(result).to.be.false;
        expect(element.errorNotification).attribute("message").equal("Vision Document Description is Blank");
    });

    it("should return true if all validations have passed", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            healthGroup: "A12345",
            dentalGroup: "D12345",
            visionGroup: "V12345"
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";

        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";
        element.appDocumentUpload.selectedFileName = "Test File Name";


        var result = element.runValidations();

        expect(result).to.be.true;
    });
    it("should return undefined group addition model if validations have failed", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            healthGroup: "A12345",
            dentalGroup: "D12345",
            visionGroup: "V12345"
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";
        element.appDocumentUpload.selectedFileName = "Test File Name";

        var populatedGroups = element.populateGroupAdditionModel();

        expect(populatedGroups).to.be.undefined;
    });
    it("should populate group addition model for New Enrollee", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            healthGroup: "A12345",
            dentalGroup: "D12345",
            visionGroup: "V12345"
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";

        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";
        element.appDocumentUpload.selectedFileName = "Test File Name";
        element.healthGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };
        element.visionGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };
        element.dentalGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };

        var populatedGroups = element.populateGroupAdditionModel();

        expect(element.vaadinDialog.opened).to.be.true;
        expect(populatedGroups).is.not.null;
        expect(populatedGroups.length).to.be.equal(3);

    });

    it("should populate group addition model for Dental and Vision New Enrollee", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            dentalGroup: "D12345",
            visionGroup: "V12345"
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";

        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";
        element.appDocumentUpload.selectedFileName = "Test File Name";
        element.visionGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };
        element.dentalGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };

        var populatedGroups = element.populateGroupAdditionModel();

        expect(element.vaadinDialog.opened).to.be.true;
        expect(populatedGroups).is.not.null;
        expect(populatedGroups.length).to.be.equal(2);

    });

    it("should populate group addition model for Health Only New Enrollee", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            healthGroup: "A12345",
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";

        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";
        element.appDocumentUpload.selectedFileName = "Test File Name";
        element.healthGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };
        var populatedGroups = element.populateGroupAdditionModel();

        expect(element.vaadinDialog.opened).to.be.true;
        expect(populatedGroups).is.not.null;
        expect(populatedGroups.length).to.be.equal(1);

    });


    it("should populate group addition model for Add a family member ", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var selectedGroups = {
            healthGroup: "A12345",
            dentalGroup: "D12345",
            visionGroup: "V12345"
        }
        element.setAttribute("selectedgroups", JSON.stringify(selectedGroups));
        //select policy not eligibilty open enrollment
        var policyElgible = {
            detail: {
                message: "10"
            }
        };
        element.policyEligibilityElement.onEligibilityTypeSelection(policyElgible);
        element.policyEligibilityElement.setAttribute("selectedeligibilitydate", "");
        await element.requirementDocElement.onAddRequirementClick();
        var addRequirementDocElement = element.requirementDocElement.shadowRoot.querySelector("add-requirement-document");
        addRequirementDocElement.selectedRequirementTypeId = 1;
        addRequirementDocElement.selectedFileName = "Test File Name";

        element.receivedDateElement.setAttribute("value", "2020-04-01");
        element.receivedDate = "2020-04-01";
        element.appDocumentUpload.selectedFileName = "Test File Name";
        element.healthGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };
        element.visionGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };
        element.dentalGroupInfo = {
            agent: {
                id: "1",
                agentName: "Agent Name"
            },
            representative: {
                id: "1",
                repName: "Rep Name"
            },
            initialAnniversaryDate: "1/1",
            companyId: 12345,
            carrier: "ABCBS",
            groupName: "Group Name",
            declinedLife: true,
            proposalId: 123457,
        };
        element.selectedContracts = {
            healthContractNumber: "A23456778",
            dentalContractNumber: "B12356789",
            visionContractNumber: "K12345688"
        }
        var populatedGroups = element.populateGroupAdditionModel();

        expect(element.vaadinDialog.opened).to.be.true;
        expect(populatedGroups).is.not.null;
        expect(populatedGroups.length).to.be.equal(3);
        expect(populatedGroups[0].contractNumber).to.be.equal("A23456778");
        expect(populatedGroups[1].contractNumber).to.be.equal("B12356789");
        expect(populatedGroups[2].contractNumber).to.be.equal("K12345688");
    });
    it("should load control for a rejected app", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var rejectedAppData = {
            healthGroupNumber: "A12345",
            dentalGroupNumber: "D12345",
            visionGroupNumber: "V12345",
            healthContractNumber: "A12356666",
            dentalContractNumber: "A34345454",
            visionContractNumber: "A12322221",
            receivedDate: "01/01/2020",
            rejectedOsdApplicationId: 1234,
            appType: 2,
            qleType: {
                id: "10"
            },
            qleDate: "1/1/2020"
        };
        element.loadControl(rejectedAppData);
        expect(element.rejectedOsdApplicationId).to.be.equal(1234);
        expect(element.receivedDate).to.be.equal("01/01/2020");
        expect(element.selectedGroups).to.be.not.null;
    });

    it("should show dialog after receiving response from Application Upload API", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var event = {
            detail: {
                response: {
                    applicationIds: {
                        Health: 123456,
                        Dental: 123232,
                        Vision: 232323, 
                    }
                }
            }
        };
        element.saveApplicationApiResponseHandler(event);
        expect(element.generatedAppsDialog).attribute("healthAppId").equal("123456");
        expect(element.generatedAppsDialog).attribute("dentalAppId").equal("123232");
        expect(element.generatedAppsDialog).attribute("visionAppId").equal("232323");
        expect(element.generatedAppsDialog).does.not.have.attribute("showApplicationUploadError");
        expect(element.vaadinDialog.opened).to.be.false;
    });
    it("should show dialog after receiving response from Application Upload API with P8 error ", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var event = {
            detail: {
                response: {
                    applicationIds: {
                        Health: 123456,
                        Dental: 123232,
                        Vision: 232323
                    },
                    showApplicationUploadError : true
                }
            }
        };
        element.saveApplicationApiResponseHandler(event);
        expect(element.generatedAppsDialog).attribute("healthAppId").equal("123456");
        expect(element.generatedAppsDialog).attribute("dentalAppId").equal("123232");
        expect(element.generatedAppsDialog).attribute("visionAppId").equal("232323");
        expect(element.generatedAppsDialog.showApplicationUploadError).to.be.true;
        expect(element.vaadinDialog.opened).to.be.false;
    });
    it("should show dialog after receiving response from rejected Application Upload API", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.rejectedOsdApplicationId = 1;
        var event = {
            detail: {
                response: {
                    applicationIds: {
                        Health: 123456,
                        Dental: 123232,
                        Vision: 232323
                    }
                }
            }
        };
        await element.saveApplicationApiResponseHandler(event);
        expect(element.vaadinDialog.opened).to.be.false;
    });
     it("should show dialog after receiving response from rejected Application Upload API with P8 error", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        element.rejectedOsdApplicationId = 1;
        var event = {
            detail: {
                response: {
                    applicationIds: {
                        Health: 123456,
                        Dental: 123232,
                        Vision: 232323
                    }, 
                    showApplicationUploadError: true
                }
            }
        };
        await element.saveApplicationApiResponseHandler(event);
        expect(element.vaadinDialog.opened).to.be.false;
    });

    it("should show error message if the Save application API throws error", async () => {
        const element = await fixture(html`<data-entry></data-entry>`);
        var event = {
            detail:{
                request:{
                    response:{
                        message : "Error Occured"
                    }
                }
            }
        };
        element.handleSaveApplicationApiError(event);
        expect(element.vaadinDialog.opened).to.be.false;
        expect(element.errorNotification).attribute("message").equals("Error Occured");
    });
});