import { useState, useRef } from "react";

const Recycle = () => {
  const [showMainSection, setShowMainSection] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const goToMainSection = () => {
    setShowMainSection(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const startCamera = async () => {
    if (navigator.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        setPhoto(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationMessage(
            `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}, Précision: ${position.coords.accuracy} mètres`
          );
        },
        () => {
          setLocationMessage("Impossible d'obtenir la localisation.");
        }
      );
    } else {
      setLocationMessage("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  const reportIssue = () => {
    console.log("Problème signalé:", { description, image, photo, locationMessage });
  };

  return (
    <div className="container">
      <div className="row align-items-center justify-content-between">
        <div className="col-md-4 text-center"> 
          <img
            src="src/assets/Logo.png"
            alt="logo"
            className="w-15 img-fluid animate__animated animate__fadeInLeft"
            style={{ maxHeight: "200px" }}
          />
        </div>
        <div className="col-md-8 d-flex justify-content-end">
          <div className="dashboard-icon" id="dashboardIcon">
            <i className="fas fa-tachometer-alt fa-2x"></i>
          </div>
        </div>
      </div>

      <h1 className="mt-4 text-center animate__animated animate__fadeInRight">
        Gestion des Déchets
      </h1>

      {!showMainSection ? (
        <section id="authSection">
          <div className="card mt-4 encircled">
            <div className="card-header text-center">
              Bienvenue sur l'App de Gestion de Déchets
            </div>
            <div className="card-body text-center">
              <button className="btn btn-primary w-50 mt-3" onClick={goToMainSection}>
                Recycler
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section id="mainSection">
          <div className="card mt-4 encircled">
            <div className="card-header text-center">Capturer l'image du lieu</div>
            <div className="card-body text-center">
              <button className="btn btn-secondary" type="button" onClick={startCamera}>
                Ouvrir la caméra
              </button>
              <video ref={videoRef} style={{ width: "100%", marginTop: "10px" }} autoPlay></video>
              <button className="btn btn-primary mt-2" type="button" onClick={capturePhoto}>
                Capturer l'image
              </button>
              <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480"></canvas>
              {photo && <img src={photo} alt="Captured" className="img-fluid mt-2" />}
            </div>
          </div>

          <div className="card mt-4 encircled">
            <div className="card-body text-center">
              <button className="btn btn-primary w-100" onClick={shareLocation}>
                Partager ma position
              </button>
              <div id="locationMessage" className="mt-2">
                {locationMessage}
              </div>
            </div>
          </div>

          <div className="card mt-4 encircled">
            <div className="card-header text-center">Signaler un problème</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="description"
                    placeholder="Décris le problème"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Choisir un fichier</label>
                  <input
                    type="file"
                    className="form-control custom-input"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <button className="btn btn-primary w-100" type="button" onClick={reportIssue}>
                  Signaler
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Recycle;
