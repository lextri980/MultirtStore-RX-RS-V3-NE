import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/LockOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import UsernameIcon from "@mui/icons-material/PeopleAltOutlined";
import { Avatar, Card, Spacer } from "@nextui-org/react";
import clsx from "clsx";
import Button from "components/common/button/Button";
import ErrorMessage from "components/common/errorMessage/ErrorMessage";
import File from "components/common/file/File";
import Input from "components/common/input/Input";
import Loading from "components/common/loading/Loading";
import Modal from "components/common/modal/Modal";
import AnimatedLayout from "components/layouts/animatedLayout/AnimatedLayout";
import { FORMAT, REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { gettingProfile, updatingProfile } from "store/actions/profile.action";
import { formatDate } from "utils/date.util";
import * as yup from "yup";
import { ProfileContainer } from "./Profile.style";

function Profile() {
  //* Redux hooks
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  //* Local state
  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);
  const [openUpdateAvatarModal, setOpenUpdateAvatarModal] = useState(false);
  const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [pw1, setPw1] = useState(false);
  const [pw2, setPw2] = useState(false);
  const [pw3, setPw3] = useState(false);

  //* Hooks
  const profileSchema = yup.object().shape({
    name: yup.string().required(`Name ${REQUIRED}`),
    email: yup.string().required(`Email ${REQUIRED}`).email(`${FORMAT} email`),
  });

  const {
    register: regProfile,
    handleSubmit: handleSubmitProfile,
    trigger: triggerProfile,
    resetField: resetFieldProfile,
    reset: resetProfile,
    formState: { errors: errorsProfile },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    dispatch(gettingProfile());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile)
      resetProfile({
        name: profile.name,
        email: profile.email,
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  //@ (handleClearForm): clear form
  const handleClearForm = () => {
    resetFieldProfile("name");
    resetFieldProfile("email");
    resetFieldProfile("avatar");
    resetFieldProfile("password");
    resetFieldProfile("oldPassword");
    resetFieldProfile("confirmPassword");
    setFileName("");
  };

  //@ (handleChangeForm): handle event change form
  const handleChangeAvatar = (e) => {
    setFileName(e.target.value);
  };

  //! async (onSubmitProfile): Submit profile
  const onSubmitProfile = (form) => {
    dispatch(updatingProfile(form));
    setOpenUpdateProfileModal(false);
  };

  //! async (onSubmitAvatar): Submit avatar
  const onSubmitAvatar = (form) => {
    console.log(form);
  };

  //! async (onSubmitPassword): Submit password
  const onSubmitPassword = (form) => {
    console.log(form);
  };

  return (
    <AnimatedLayout>
      <ProfileContainer>
        {/* //*------------------------------- Card 1 -------------------------------*/}
        <Card css={{ mw: "420px", padding: "25px 40px" }}>
          <div className="horizontal-center">
            <p>Comming soon</p>
            <Spacer x={0.5}></Spacer>
            <Loading />
          </div>
        </Card>

        {/* //*------------------------------- Card 2 -------------------------------*/}
        <Card css={{ mw: "420px", padding: "25px 40px", margin: "0 90px" }}>
          <Card.Header className="center">
            <Avatar
              className="avatar"
              text={profile?.name.charAt(0).toUpperCase()}
            />
          </Card.Header>
          <Card.Body>
            {loading === true ? (
              <Loading type="gradient" size="lg" />
            ) : (
              <>
                <p className="mb-10">
                  <span className="title">ID</span>
                  <span className="content">{profile?._id}</span>
                </p>
                <p className="mb-10">
                  <span className="title">Name</span>
                  <span className="content">{profile?.name}</span>
                </p>
                <p className="mb-10">
                  <span className="title">Email</span>
                  <span className="content">{profile?.email}</span>
                </p>
                <p className="mb-10">
                  <span className="title">Account</span>
                  <span className="content">
                    {profile?.isAdmin === true ? "Admin" : "User"}
                  </span>
                </p>
                <p
                  className={clsx({
                    "mb-10": profile?.createdAt !== profile?.updatedAt,
                  })}
                >
                  <span className="title">Created</span>
                  <span className="content">
                    {formatDate(profile?.createdAt, "DD/MM/YYYY")}
                  </span>
                </p>
                {profile?.createdAt === profile?.updatedAt ? (
                  ""
                ) : (
                  <p>
                    <span className="title">Updated</span>
                    <span className="content">
                      {formatDate(profile?.updatedAt, "DD/MM/YYYY")}
                    </span>
                  </p>
                )}
              </>
            )}
          </Card.Body>
          <Card.Footer className="center">
            <Button
              color="warning"
              width="320px"
              onClick={() => {
                setOpenUpdateProfileModal(true);
                handleClearForm();
              }}
            >
              Update profile
            </Button>
            <Spacer x={1} />
            <div className="horizontal-center">
              <Button
                color="success"
                width="150px"
                onClick={() => {
                  setOpenUpdateAvatarModal(true);
                  handleClearForm();
                }}
              >
                Change avatar
              </Button>
              <Spacer x={1} />
              <Button
                color="danger"
                width="150px"
                onClick={() => {
                  setOpenUpdatePasswordModal(true);
                  handleClearForm();
                }}
              >
                Change password
              </Button>
            </div>
          </Card.Footer>
        </Card>

        {/* //*------------------------------- Card 3 -------------------------------*/}
        <Card css={{ mw: "420px", padding: "25px 40px" }}>
          <div className="horizontal-center">
            <p>Comming soon</p>
            <Spacer x={0.5}></Spacer>
            <Loading />
          </div>
        </Card>

        {/* //!---------------- Modal section -------------------*/}
        {/* Modal update profile ------------------------------- */}
        <Modal
          open={openUpdateProfileModal}
          header="Update profile"
          submitBtn="Update"
          close={() => setOpenUpdateProfileModal(false)}
        >
          <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
            <Input
              label={<UsernameIcon />}
              placeholder="Name"
              value="name"
              register={regProfile}
              error={errorsProfile.name ? true : false}
            />
            {errorsProfile.name ? (
              <ErrorMessage>{errorsProfile.name.message}</ErrorMessage>
            ) : (
              <Spacer y={1} />
            )}
            <Input
              label={<EmailIcon />}
              placeholder="Email"
              value="email"
              register={regProfile}
              error={errorsProfile.email ? true : false}
            />
            {errorsProfile.email && (
              <ErrorMessage>{errorsProfile.email.message}</ErrorMessage>
            )}
            <footer className="modal-footer">
              <Button
                color="danger"
                onClick={() => setOpenUpdateProfileModal(false)}
              >
                Cancel
              </Button>
              <Button
                color="success"
                type="submit"
                onClick={() => triggerProfile()}
              >
                Update
              </Button>
            </footer>
          </form>
        </Modal>

        {/* Modal update avatar ------------------------------- */}
        <Modal
          open={openUpdateAvatarModal}
          header="Change avatar"
          submitBtn="Update"
          close={() => setOpenUpdateAvatarModal(false)}
        >
          <div className="horizontal-center">
            <Avatar
              size={"xl"}
              text={profile?.name.charAt(0).toUpperCase()}
              css={{ size: "$20" }}
            />
          </div>
          <form onSubmit={handleSubmitProfile(onSubmitAvatar)}>
            <File
              onChange={handleChangeAvatar}
              name={fileName}
              fileTitle="Choose avatar"
              onClear={handleClearForm}
            />
            <footer className="modal-footer">
              <Button
                color="danger"
                onClick={() => setOpenUpdateAvatarModal(false)}
              >
                Cancel
              </Button>
              <Button color="success" type="submit">
                Update
              </Button>
            </footer>
          </form>
        </Modal>

        {/* Modal update password ------------------------------- */}
        <Modal
          open={openUpdatePasswordModal}
          header="Change password"
          submitBtn="Update"
          close={() => setOpenUpdatePasswordModal(false)}
        >
          <form onSubmit={handleSubmitProfile(onSubmitPassword)}>
            <Input
              placeholder="Old password"
              label={<LockIcon />}
              value="oldPassword"
              password
              type={pw1}
              onPassword={() => setPw1(!pw1)}
            />
            <Spacer y={1} />
            <Input
              placeholder="New password"
              label={<LockIcon />}
              value="password"
              password
              type={pw2}
              onPassword={() => setPw2(!pw2)}
            />
            <Spacer y={1} />
            <Input
              placeholder="Confirm new password"
              label={<LockResetOutlinedIcon />}
              value="newPassword"
              password
              type={pw3}
              onPassword={() => setPw3(!pw3)}
            />
            <footer className="modal-footer">
              <Button
                color="danger"
                onClick={() => setOpenUpdatePasswordModal(false)}
              >
                Cancel
              </Button>
              <Button color="success" type="submit">
                Update
              </Button>
            </footer>
          </form>
        </Modal>
      </ProfileContainer>
    </AnimatedLayout>
  );
}

export default Profile;
