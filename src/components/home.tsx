import React, { Component } from 'react'
import { getMusicDetails } from '../api/service';

import loading from '../icons/loading.gif';

interface IHomeState {
    data: Array<RecordingCompany>,
    isProcessing: boolean
}

interface RecordingCompany {
    RecordName: string,
    Bands: Band[]
}

interface Band {
    Name: string,
    Festivals: string[]
}

class Home extends Component<{}, IHomeState> {

    constructor(props: {}) {
        super(props);

        this.state = this.setDefaultState();
    }

    componentDidMount() {
        this.setState({ isProcessing: true });

        getMusicDetails((res: any) => {
            if (res.data !== null && res.data.RecordName !== null && res.data.RecordName !== "") {
                this.setState({ data: res.data, isProcessing: false });
            }
        }, (err: any) => {
            console.log(err);
            this.setState({ isProcessing: false });
        });
    }

    setDefaultState = () => {
        return {
            data: [
                {
                    RecordName: "",
                    Bands: [
                        {
                            Name: "",
                            Festivals: []
                        }
                    ]
                }
            ],
            isProcessing: false
        };
    }

    getErrorTemplate = () => {
        return (
            <div>No data found!!</div>
        );
    }

    getFestivalNameTemplate = (festivals: string[]) => {
        return festivals.map((f, i) => {
            return (
                <li key={i}>
                    {f}
                </li>
            );
        })
    }

    getArtistTemplate = (bands: Band[]) => {
        return bands.map((b, i) => {
            return (
                <div className="card" key={i}>
                    <div className="card-body">
                        <h5 className="card-title">{b.Name}</h5>
                        <ul>
                            {this.getFestivalNameTemplate(b.Festivals)}
                        </ul>
                    </div>
                </div>
            );
        })
    }

    getRecordCompanyTemplate = () => {
        if (this.state.data) {
            console.log("D", this.state.data);
            return this.state.data.map((d, i) => {
                if (d.RecordName !== "") {
                    return (
                        <div className="card mb-3" key={i}>
                            <div className="card-header">
                                <span className="card-title">
                                    {d.RecordName}
                                </span>
                            </div>
                            <div className="card-body">
                                {this.getArtistTemplate(d.Bands)}
                            </div>
                        </div>
                    );
                }
                return this.getErrorTemplate();
            })
        }

        return this.getErrorTemplate();
    }

    render() {
        if (this.state.isProcessing) {
            return (
                <img src={loading} alt="loading..." />
            );
        }

        return (
            <div>
                {this.getRecordCompanyTemplate()}
            </div>
        )
    }
}

export default Home;